import Router from 'koa-router';
import { getRepository } from 'typeorm';

import Training from 'models/Training';

const Trainings = getRepository(Training);

const router = new Router().prefix('/admin/trainings');

router.param('tid', async (id, ctx, next) => {
  const training = await Trainings.findOne(id);
  if (!training) throw ctx.throw(404);

  ctx.state.training = training;
  return next();
});

router.get('/new', async ctx => {
  await ctx.render('admin/trainings/new-training', { isNew: true });
});

router.post('/new', async ctx => {
  const form = ctx.request.body;

  const { error, value } = Training.schema.validate(form);
  if (error) {
    return ctx.render('admin/trainings/new-training', {
      form: { ...form, errors: error.details },
      isNew: true,
    });
  }

  const training = Trainings.create(value as Partial<Training>);

  try {
    const newTraining = await Trainings.save(training);
    ctx.redirect(`/admin/trainings/${newTraining.id}/edit`);
  } catch (err) {
    await ctx.render('admin/trainings/new-training', {
      error: err.message,
      form: { ...value },
      isNew: true,
    });
  }
});

router.get('/:tid/edit', async ctx => {
  return ctx.render('admin/trainings/edit-training', {
    form: { ...ctx.state.training },
  });
});

router.post('/:tid/edit', async ctx => {
  const form = ctx.request.body;
  form.isGraded = 'isGraded' in form;

  const { error, value } = Training.schema.validate(form);
  if (error) {
    return await ctx.render('admin/trainings/edit-training', {
      form: { ...value, errors: error.details },
    });
  }

  const submittedTraining = Trainings.merge(ctx.state.training, value);

  try {
    const updatedTraining = await Trainings.save(submittedTraining);
    return ctx.redirect(`/admin/trainings/${updatedTraining.id}`);
  } catch (err) {
    await ctx.render('admin/trainings/edit-training', {
      form: value,
      error: err.message,
    });
  }
});

export default router;
