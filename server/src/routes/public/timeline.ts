import Router from 'koa-router';

const router = new Router();

router.get('/soc-timeline', async ctx => {
  return ctx.render('public/soc-timeline');
});

export default router;
