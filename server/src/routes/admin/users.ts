import bcrypt from 'bcrypt';
import Router from 'koa-router';
import County from 'models/County';
import { getRepository } from 'typeorm';
import mailer from '../../mailer';
import User, { UserStatus } from '../../models/User';
import config from '../../server.config.json';
import { randToken } from '../../utils/tokenUtils';
import { validate } from '../../validator';

const Users = getRepository(User);

const router = new Router();

// TODO: consolidate route prefixes and user entity fetching in higher route param

router.get('/admin/users', async ctx => {
  const users = await Users.find();

  await ctx.render('admin/users/users', { users });
});

router.get('/admin/users/:uid', async ctx => {
  const uid = parseInt(ctx.params.uid, 10);

  const user = await Users.findOne({
    where: { id: uid },
    relations: ['attempts'],
  });

  if (!user) throw ctx.throw(404);

  await ctx.render('admin/users/view-user', { user });
});

router.post('/admin/users/:uid/sendverification', async ctx => {
  const uid = parseInt(ctx.params.uid, 10);

  const user = await Users.findOne({ where: { id: uid } });
  if (!user) throw ctx.throw(404);

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

router.get('/admin/users/:oid/edit', async ctx => {
  const { oid } = ctx.params;

  let user;

  if (oid != 'new') {
    user = await Users.findOne(ctx.params.oid);
    if (!user) throw ctx.throw(404);
  } else {
    user = { id: 'new' };
  }

  const counties = await getRepository(County).find();

  await ctx.render('admin/users/edit-user', { user, counties, form: user });
});

router.post('/admin/users/:oid/edit', async ctx => {
  let { oid } = ctx.params;
  let user: User | undefined;
  const isNew = oid == 'new';

  if (isNew) {
    user = new User();
  } else {
    oid = parseInt(oid, 10);
    user = await Users.findOne(oid);
    if (!user) return (ctx.status = 404);
  }

  const counties = await getRepository(County).find();

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

    let newPass;
    if (isNew) {
      newPass = randToken(10);
      user.phash = bcrypt.hashSync(newPass, config.bcryptHashRounds);
    }

    const { id } = await Users.save(submittedUser);
    const updatedUser = await Users.findOne(id);

    if (isNew || changedEmail) {
      await mailer.sendUserRegistration(updatedUser!, {
        isNewAccount: isNew,
        newPass,
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

export default router;
