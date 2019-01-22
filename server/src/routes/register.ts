import Router from 'koa-router';

const router = new Router();

router.get('/register', async ctx => {
  if (ctx.state.authUser) {
    // redirect to dashboard
    ctx.redirect('/dashboard');
    return;
  }

  await ctx.render('register');
});

export default router;
