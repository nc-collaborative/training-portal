import {
  Forbidden as ForbiddenError,
  Unauthorized as UnauthorizedError,
} from 'http-errors';
import jwt from 'jsonwebtoken';
import { Context } from 'koa';
import { IRouterContext } from 'koa-router';
import { getRepository } from 'typeorm';

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

export function setAuthCookie(ctx: Context | IRouterContext, user: User) {
  // Set auth token and redirect
  const token = jwt.sign({ uid: user.id }, config.jwtSecret, {
    expiresIn: '24h',
  });

  ctx.cookies.set('auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production',
    maxAge: 24 * 3600 * 1000,
  });
}

interface IjwtPayload {
  exp: number;
  uid: number;
}

export async function authMiddleware(ctx: Context, next) {
  // jwt should be in cookie called 'auth'
  const rawJwt = ctx.cookies.get('auth');
  if (!rawJwt) {
    ctx.state.authUser = undefined;
    return next();
  }

  try {
    const token = jwt.verify(rawJwt, config.jwtSecret) as IjwtPayload;
    const user = await getRepository(User).findOneOrFail(Number(token.uid));
    ctx.state.authUser = user.toJSON();

    // Refresh token if it expires in less than 1 hour (exp is in seconds)
    const oneHr = Math.floor(Date.now() / 1000) + 3600;
    if (token.exp < oneHr) {
      setAuthCookie(ctx, user);
    }
  } catch (e) {
    // delete the cookie, everything else will act as if not logged in
    ctx.cookies.set('auth');
    ctx.state.authUser = undefined;
  }
  return next();
}
