import {
  NotFound as NotFoundError,
  Unauthorized as UnauthorizedError,
} from 'http-errors';
import { Context } from 'koa';

import { logger } from '../logger';

export default async function errorMiddleware(ctx: Context, next) {
  try {
    await next();
    if (ctx.status == 404) {
      logger.verbose(`not found: ${ctx.url}`);
      ctx.response.status = 404;
      return ctx.render('404');
    }
  } catch (err) {
    if (err instanceof NotFoundError) {
      ctx.response.status = 404;
      return ctx.render('404');
    }

    if (err instanceof UnauthorizedError) {
      return ctx.redirect(
        '/login?redirect=' + encodeURIComponent(ctx.originalUrl),
      );
    }

    logger.error(err);
    ctx.status = 500;
    return ctx.render('500', { err });
  }
}
