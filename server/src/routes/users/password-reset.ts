import Router from 'koa-router';
import { getRepository } from 'typeorm';

import * as valid from 'utils/validation';

import User from 'models/User';
import { randToken } from 'utils/tokenUtils';
import mailer from '../../mailer';

const Users = getRepository(User);

const router = new Router();

router.use(async (ctx, next) => {
  if (ctx.state.authUser) return ctx.redirect('/');
  return next();
});

router.get('/password-reset', async ctx => {
  return ctx.render('users/password-reset');
});

router.post('/password-reset', async ctx => {
  const { email } = ctx.request.body;

  const user = await Users.findOne({ email });

  if (user) {
    user.passwordResetToken = randToken(36);
    await Users.save(user);
    await mailer.sendPasswordReset({ user });
  }

  return ctx.render('users/password-reset', { done: true });
});

router.get('/change-password', async ctx => {
  const { u, t } = ctx.request.query;

  const user = await Users.findOne(u);
  if (!user) throw ctx.throw(404);

  if (user.passwordResetToken != t) throw ctx.throw(404);

  return ctx.render('users/change-password', { user, token: t });
});

router.post('/change-password', async ctx => {
  const { userId, token, password, password2 } = ctx.request.body;

  const user = await Users.findOne(userId);
  if (!user) throw ctx.throw(404);

  if (user.passwordResetToken != token) throw ctx.throw(404);

  const { value, error } = valid.password.validate({ password, password2 });
  if (error) {
    return ctx.render('users/change-password', {
      form: { errors: error.details },
      user,
      token,
    });
  }

  await user.setPassword(value.password);
  user.passwordResetToken = null;
  await Users.save(user);
  await mailer.sendPasswordChanged({ user });

  return ctx.render('users/change-password', { done: true });
});

export default router;
