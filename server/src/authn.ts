import {
  Forbidden as ForbiddenError,
  Unauthorized as UnauthorizedError,
} from 'http-errors';
import jwt from 'jsonwebtoken';
import { IRouterContext } from 'koa-router';

import User from 'models/User';
import config from './server.config.json';

export function assertRole(ctx: IRouterContext, role: string) {
  if (!ctx.state.authUser) throw new UnauthorizedError();
  if (ctx.state.authUser.userRoles.includes(role)) return true;
  else throw new ForbiddenError();
}

export function setAuthCookie(ctx: IRouterContext, user: User) {
  // Set auth token and redirect
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 24 * 3600,
      uid: user.id,
    },
    config.jwtSecret,
  );

  ctx.cookies.set('auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production',
    maxAge: 24 * 3600 * 1000,
  });
}
