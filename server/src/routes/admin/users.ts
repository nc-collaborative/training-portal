import Router from 'koa-router';
import County from 'models/County';
import { getRepository } from 'typeorm';
import mailer from '../../mailer';
import User, { UserStatus } from '../../models/User';
import { randToken } from '../../utils/tokenUtils';
import { validate } from '../../validator';

const Users = getRepository(User);
const Counties = getRepository(County);

const router = new Router({
  prefix: '/admin/users',
});

router.use(async (ctx, next) => {
  ctx.state.counties = await Counties.find();
  return next();
});

router.param('uid', async (id, ctx, next) => {
  if (id == 'new') return next();
  const user = await Users.findOne(id);
  if (!user) throw ctx.throw(404);
  ctx.state.user = user;
  return next();
});

/**
 * Index / list of users
 */
router.get('/', async ctx => {
  const users = await Users.find();
  await ctx.render('admin/users/users', { users });
});

/**
 * Info page of specific user
 */
router.get('/:uid(\\d+)', async ctx => {
  const user = await Users.findOne(ctx.state.user.id, {
    relations: ['attempts'],
  });
  await ctx.render('admin/users/view-user', { user });
});

/**
 * Re-send email verification code to user
 */
router.post('/:uid/sendverification', async ctx => {
  const user = ctx.state.user;

  try {
    user.genVerifyCode();
    await Users.save(user);
    await mailer.sendUserRegistration(user, { isNewAccount: false });
    ctx.status = 202;
  } catch (err) {
    ctx.status = 500;
    ctx.throw(err, 500);
  }
});

/**
 * Edit user page
 */
router.get('/:uid/edit', async ctx => {
  const { user, counties } = ctx.state;
  await ctx.render('admin/users/edit-user', { user, counties, form: user });
});

router.post('/:uid/edit', async ctx => {
  const { user, counties } = ctx.state;
  const form = ctx.request.body;

  const changedEmail = user.email != form.email;

  const submittedUser = Users.merge(user, form);

  // HACK: maybe there's a better way to do this with TypeORM? But for now,
  // this is the easiest way to make sure changes to county are saved
  submittedUser.county = counties.find(c => c.id == form.countyId)!;

  const errors = await validate(submittedUser);
  if (errors.length) {
    ctx.status = 400;
    return await ctx.render('admin/users/edit-user', {
      form: { ...submittedUser, errors },
      user: submittedUser,
      counties,
    });
  }

  try {
    if (changedEmail) {
      user.status = UserStatus.Unverified;
      user.genVerifyCode();
    }

    const { id } = await Users.save(submittedUser);
    const updatedUser = await Users.findOne(id);

    if (changedEmail) {
      await mailer.sendUserRegistration(updatedUser!, {
        isNewAccount: false,
      });
    }

    // Save was successful, redirect back to view user
    return ctx.redirect(`/admin/users/${updatedUser!.id}`);
  } catch (error) {
    ctx.status = 401;
    await ctx.render('admin/users/edit-user', {
      form: { ...submittedUser, error },
      user: submittedUser,
      counties,
    });
  }
});

/**
 * Create new user page
 */
router.get('/new', async ctx => {
  const { counties } = ctx.state;
  await ctx.render('admin/users/edit-user', { isNew: true, counties });
});

router.post('/new', async ctx => {
  const { counties } = ctx.state;
  const form = ctx.request.body;

  const submittedUser = Users.merge(Users.create(), form);

  // HACK: maybe there's a better way to do this with TypeORM? But for now,
  // this is the easiest way to make sure changes to county are saved
  submittedUser.county = counties.find(c => c.id == form.countyId)!;

  const errors = await validate(submittedUser);
  if (errors.length) {
    ctx.status = 400;
    return await ctx.render('admin/users/edit-user', {
      form: { ...submittedUser, errors },
      user: submittedUser,
      counties,
      isNew: true,
    });
  }

  const newPass = randToken(16);

  const newUser = await Users.save(submittedUser);
  await mailer.sendUserRegistration(newUser, { isNewAccount: true, newPass });
  ctx.redirect(`/admin/users/${newUser.id}`);
});

export default router;
