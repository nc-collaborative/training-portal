import jwt from 'jsonwebtoken';
import { Context } from 'koa';
import { getRepository } from 'typeorm';

import User from '../models/User';
import config from '../server.config.json';

interface IjwtPayload {
  exp: number;
  uid: number;
}

export default async function authMiddleware(ctx: Context, next) {
  // jwt should be in cookie called 'auth'
  const rawJwt = ctx.cookies.get('auth');
  if (!rawJwt) {
    ctx.state.authUser = null;
    return next();
  }

  try {
    const token = jwt.verify(rawJwt, config.jwtSecret) as IjwtPayload;

    // set authUser for later routes
    ctx.state.authUser = await getRepository(User).findOneOrFail(
      Number(token.uid),
    );

    // Refresh expiry of token
    token.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // expire 24 hours from now
    ctx.cookies.set('auth', jwt.sign(token, config.jwtSecret), {
      httpOnly: true,
      secure: process.env.NODE_ENV == 'production',
      maxAge: 24 * 3600 * 1000, // 24 hr in ms
    });
  } catch (e) {
    // delete the cookie, everything else will act as if not logged in
    ctx.cookies.set('auth');
    ctx.state.authUser = null;
  }
  return next();
}
