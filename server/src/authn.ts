import {
  Forbidden as ForbiddenError,
  Unauthorized as UnauthorizedError,
} from 'http-errors';
import jwt from 'jsonwebtoken';
import { IRouterContext } from 'koa-router';

import User from 'models/User';
import config from './server.config.json';

export type AuthUser = User & {
  phash?: never;
  verifyCode?: never;
  userRoles: string[];
};

/**
 * Ensure that the authUser of the given context has the specified role,
 * else throw an appropriate error.
 *
 * If no role is specified, assert that the current context has any logged-in user
 */
export function assertRole(ctx: IRouterContext, role?: string) {
  const user: AuthUser | undefined = ctx.state.authUser;
  if (!user) throw new UnauthorizedError();
  if (!role) return true;
  if (user.userRoles.includes(role)) return true;
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
