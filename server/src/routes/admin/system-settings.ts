import Router from 'koa-router';

import SystemSettings from 'models/SystemSettings';

const router = new Router();

router.use(async (ctx, next) => {
  ctx.state.settings = await SystemSettings.getSettings();
  return next();
});

router.get('/admin/system-settings', async ctx => {
  const { settings } = ctx.state;
  return ctx.render('admin/system-settings', { form: { ...settings } });
});

router.post('/admin/system-settings', async ctx => {
  const { value, error } = SystemSettings.schema.validate(ctx.request.body);
  if (error) {
    return ctx.render('admin/system-settings', {
      form: { ...value, errors: error.details },
    });
  }

  const settings = await SystemSettings.update(value);

  return ctx.render('admin/system-settings', {
    form: { ...settings },
    saved: true,
    system: settings,
  });
});

export default router;
