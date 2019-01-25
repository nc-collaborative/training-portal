import 'module-alias/register';

import fg from 'fast-glob';
import {
  NotFound as NotFoundError,
  Unauthorized as UnauthorizedError,
} from 'http-errors';
import jwt from 'jsonwebtoken';
import Koa from 'koa';
import bodyParser from 'koa-body';
import helmet from 'koa-helmet';
import mount from 'koa-mount';
import nunjucks from 'koa-nunjucks-async';
import Router from 'koa-router';
import serve from 'koa-static';
import njDateFilter from 'nunjucks-date-filter';
import * as path from 'path';

import database from './database';
import { logger } from './logger';
import User from './models/User.js';
import config from './server.config.json';
import * as njFilters from './utils/njk-filters';

const { env } = process;

const app = new Koa();

app.use(helmet());

njDateFilter.setDefaultFormat(config.defaultDateFormat);

app.use(
  nunjucks(path.join(__dirname, '../', 'views'), {
    ext: '.njk',
    opts: { noCache: !(env.NODE_ENV == 'production') },
    filters: {
      date: njDateFilter,
      ...njFilters,
    },
    globals: { NODE_ENV: env.NODE_ENV },
  }),
);

app.use(bodyParser());

interface IjwtPayload {
  exp: number;
  authUser: User;
}

// JWT checking
app.use(async (ctx, next) => {
  // jwt should be in cookie called 'auth'
  const rawJwt = ctx.cookies.get('auth');
  if (!rawJwt) {
    ctx.state.authUser = null;
    return next();
  }

  try {
    const token = jwt.verify(rawJwt, config.jwtSecret) as IjwtPayload;
    ctx.state.authUser = token.authUser; // set authUser for later routes

    // Refresh expiry of token
    token.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // expire 24 hours from now
    ctx.cookies.set('auth', jwt.sign(token, config.jwtSecret), {
      httpOnly: true,
      secure: env.NODE_ENV == 'production',
      maxAge: 24 * 3600 * 1000, // 24 hr in ms
    });
  } catch (e) {
    // delete the cookie, everything else will act as if not logged in
    ctx.cookies.set('auth');
    ctx.state.authUser = null;
  }
  return next();
});

(async () => {
  const db = await database;
  const Users = db.getRepository(User);

  const router = new Router();

  // Universal error handling
  app.use(async (ctx, next) => {
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
  });

  router.get('/', async ctx => {
    const { authUser } = ctx.state;
    if (authUser) {
      if (authUser.userRoles.includes('admin')) {
        return ctx.redirect('/admin/dashboard');
      }
      if (authUser.userRoles.includes('learner')) {
        return ctx.redirect('/learner/dashboard');
      }
    }
    await ctx.render('index', { message: 'hello' });
  });

  router.get('/about', async ctx => {
    await ctx.render('about');
  });

  router.get('/test', async ctx => {
    await ctx.render('test');
  });

  app.use(router.routes());

  // Load other routes
  const routeDefs = fg.sync([__dirname + '/routes/**/*.js']);

  for (const def of routeDefs) {
    const r: Router = (await import(def as string)).default;
    app.use(r.routes());
  }

  app.listen(config.port);

  logger.info(`Server running on port ${config.port}`);
})().catch(err => {
  logger.error(err);
  logger.error('UNABLE TO START SERVER');
  console.error(err);
  process.exit(1);
});

