import {
  Forbidden as ForbiddenError,
  Unauthorized as UnauthorizedError,
} from 'http-errors';
import { IRouterContext } from 'koa-router';

export function assertRole(ctx: IRouterContext, role: string) {
  if (!ctx.state.authUser) throw new UnauthorizedError();
  if (ctx.state.authUser.userRoles.includes(role)) return true;
  else throw new ForbiddenError();
}
