import Router from 'koa-router';
import { getRepository } from 'typeorm';

import County from 'models/County';
import User, { UserStatus } from 'models/User';
import UserRole from 'models/UserRole';

import mailer from '../../mailer';

const Counties = getRepository(County);
const Users = getRepository(User);
const UserRoles = getRepository(UserRole);

const router = new Router({
  prefix: '/admin/users',
});

router.use(async (ctx, next) => {
  const [counties, userRoles] = await Promise.all([
    Counties.find(),
    UserRoles.find(),
  ]);
  ctx.state.counties = counties;
  ctx.state.userRoles = userRoles;
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
  const { user, counties, userRoles } = ctx.state;
  await ctx.render('admin/users/edit-user', {
    user,
    counties,
    userRoles,
    form: { ...user, userRoleIds: user.userRoles.map(r => r.id) },
  });
});

router.post('/:uid/edit', async ctx => {
  const { user, counties, userRoles } = ctx.state;
  const form = ctx.request.body;

  let { value, error } = User.schema.validate(form);

  if (error) {
    ctx.status = 400;
    return await ctx.render('admin/users/edit-user', {
      form: { ...value, errors: error.details },
      user: value,
      counties,
      userRoles,
    });
  }

  const changedEmail = user.email != value.email;
  const submittedUser = Users.merge(user, value, {
    county: { id: value.countyId },
  });

  submittedUser.userRoles = value.userRoleIds.map(id => ({ id }));

  // Special case: admins should not be able to accidentally remove their own
  // admin access
  if (user.id == ctx.state.authUser.id) {
    submittedUser.userRoles.push({ id: 1 } as UserRole);
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

    // TODO: better way to separately handle conflicting email vs. other
    // possible saving errors
  } catch (error) {
    ctx.status = 401;
    await ctx.render('admin/users/edit-user', {
      form: {
        ...value,
        errors: [
          {
            context: { key: 'email' },
            message: 'A user with that email already exists.',
          },
        ],
      },
      user: value,
      counties,
      userRoles,
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

  let { value, error } = User.schema.validate(form) as any;

  if (!error && (await Users.findOne({ email: value.email }))) {
    if (!error) error = { details: [] };
    error.details.push({
      context: { key: 'email' },
      message: 'A user with that email already exists',
    });
  }

  if (error) {
    ctx.status = 400;
    return await ctx.render('admin/users/edit-user', {
      form: { ...form, errors: error.details },
      user: value,
      counties,
      isNew: true,
    });
  }

  const { pword, phash } = await User.generateNewPass();
  const submittedUser = Users.merge(Users.create(), value, { phash });

  // HACK: maybe there's a better way to do this with TypeORM? But for now,
  // this is the easiest way to make sure changes to county are saved
  submittedUser.county = counties.find(c => c.id == value.countyId)!;

  const newUser = await Users.save(submittedUser);
  await mailer.sendUserRegistration(newUser, {
    isNewAccount: true,
    newPass: pword,
  });
  ctx.redirect(`/admin/users/${newUser.id}`);
});

export default router;
