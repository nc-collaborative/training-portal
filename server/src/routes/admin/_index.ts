import Router from 'koa-router';
import { assertRole } from '../../authn';

const router = new Router();

router.all('/admin/(.*)', async (ctx, next) => {
  assertRole(ctx, 'admin');
  await next();
});

export default router;
