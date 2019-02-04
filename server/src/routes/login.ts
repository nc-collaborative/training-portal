import bcrypt from 'bcrypt';
import Router from 'koa-router';
import { getRepository } from 'typeorm';

import { setAuthCookie } from '../authn';
import User, { UserStatus } from '../models/User';

const router = new Router();

router.all('/login', async (ctx, next) => {
  if (ctx.state.authUser) {
    ctx.redirect('/dashboard');
    return;
  }
  await next();
});

router.get('/login', async ctx => {
  await ctx.render('login', { redirect: ctx.query.redirect });
});

router.post('/login', async ctx => {
  const Users = getRepository(User);
  const { email, password } = ctx.request.body;

  const user = await Users.findOne({ email });
  if (!user) {
    return await ctx.render('login', {
      form: { email, errors: { email: true } },
    });
  }

  if (!(await bcrypt.compare(password, user.phash))) {
    return await ctx.render('login', {
      form: { email, errors: { password: true } },
    });
  }

  if (user.status == UserStatus.Unverified) {
    return await ctx.render('login', {
      needVerifyEmail: true,
      form: { email },
    });
  }

  setAuthCookie(ctx, user);

  if (ctx.query.redirect) {
    ctx.redirect(ctx.query.redirect);
  } else {
    ctx.redirect('/trainings');
  }
});

router.get('/logout', async ctx => {
  ctx.cookies.set('auth'); // delete auth token
  ctx.redirect('/'); // and redirect to home
});

export default router;
