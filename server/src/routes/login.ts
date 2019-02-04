import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Router from 'koa-router';
import { getRepository } from 'typeorm';
import User, { UserStatus } from '../models/User';
import config from '../server.config.json';

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

  // Set auth token and redirect
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 24 * 3600,
      authUser: user.toJSON(),
    },
    config.jwtSecret,
  );

  ctx.cookies.set('auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production',
    maxAge: 24 * 3600 * 1000,
  });

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
