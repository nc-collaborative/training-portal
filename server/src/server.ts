import 'module-alias/register';

import fg from 'fast-glob';
import Koa from 'koa';
import bodyParser from 'koa-body';
import helmet from 'koa-helmet';
import mount from 'koa-mount';
import path from 'path';
import Router from 'koa-router';
import serve from 'koa-static';

import database from './database';
import { logger } from './logger';
import User from './models/User.js';
import config from './server.config.json';

import authMiddleware from './middleware/auth';
import errorMiddleware from './middleware/errors';
import nunjucksMiddlware from './middleware/nunjucks';
import SystemSettings from 'models/SystemSettings';

const app = new Koa();
app.proxy = true;

app.use(helmet());

app.use(nunjucksMiddlware);

app.use(bodyParser());

app.use(authMiddleware);

// Universal error handling
app.use(errorMiddleware);

if (config.serveStatic) {
  app.use(mount('/static', serve(path.join(__dirname, '..', '..', 'static'))));
  app.use(
    mount(
      '/scripts',
      serve(path.join(__dirname, '..', '..', 'browser', 'dist')),
    ),
  );
}

(async () => {
  const db = await database;

  const router = new Router();

  app.use(async (ctx, next) => {
    const {
      state: { authUser },
      request,
    } = ctx;

    const settings = await SystemSettings.getSettings();
    ctx.state.system = settings;

    if (settings.maintenance) {
      if (!authUser || !authUser.userRoles.includes('admin')) {
        if (request.URL.pathname != '/login') {
          return ctx.redirect('/static/maintenance.html');
        }
      }
    }

    return next();
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

  if (process.env.NODE_ENV != 'production') {
    router.get('/robots.txt', async ctx => {
      ctx.response.body = 'User-agent: *\nDisallow: /';
    });
  }

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
  process.exit(1);
});

process.on('beforeExit', () => {
  logger.info('process exiting');
});

process.on('uncaughtException', e => {
  logger.error(e);
});

process.on('unhandledRejection', e => {
  logger.error(e);
});
