import Router from 'koa-router';
import { getRepository } from 'typeorm';

import { assertRole } from '../../authn';
import User from 'models/User';
import County from 'models/County';
import mailer from '../../mailer';

const router = new Router();

const Users = getRepository(User);
const Counties = getRepository(County);

router.use(async (ctx, next) => {
  assertRole(ctx);
  return next();
});

router.get('/profile', async ctx => {
  await ctx.render('users/profile', { user: ctx.state.authUser });
});

router.get('/profile/edit', async ctx => {
  const user = ctx.state.authUser;
  const counties = await Counties.find();
  return ctx.render('users/profile-edit', { user, form: user, counties });
});

router.post('/profile/edit', async ctx => {
  const user = ctx.state.authUser;
  const counties = await Counties.find();
  const form = ctx.request.body;

  const { error, value } = User.schema.validate(form);
  if (error) {
    return ctx.render('users/profile-edit', {
      user,
      counties,
      form: { ...value, errors: error.details },
    });
  }

  const existingUser = (await Users.findOne(user.id))!;

  const updateUser = Users.merge(existingUser, value, {
    county: { id: value.countyId },
    userRoles: existingUser.userRoles,
  });

  const changedEmail = updateUser.email != existingUser.email;

  if (changedEmail) updateUser.genVerifyCode();

  try {
    await Users.save(updateUser);
    if (changedEmail) {
      await mailer.sendUserRegistration(updateUser);
    }
    return ctx.redirect('/profile');
  } catch (err) {
    ctx.status = 400;
    return ctx.render('users/profile-edit', {
      user,
      counties,
      error: err.message,
      form: { ...value },
    });
  }
});

export default router;
