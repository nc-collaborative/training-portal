import Router from 'koa-router';
import { getRepository } from 'typeorm';

import Training from 'models/Training';
import Organization from 'models/Organization';

const Trainings = getRepository(Training);
const Organizations = getRepository(Organization);

const router = new Router().prefix('/admin/trainings');

router.use(async (ctx, next) => {
  ctx.state.orgs = await Organizations.find();
  return next();
});

router.param('tid', async (id, ctx, next) => {
  const training = await Trainings.findOne(id, {
    relations: ['organizations'],
  });
  if (!training) throw ctx.throw(404);

  ctx.state.training = training;
  return next();
});

router.get('/new', async ctx => {
  await ctx.render('admin/trainings/edit-training', {
    form: { organizations: [] },
    isNew: true,
  });
});

router.post('/new', async ctx => {
  const form = ctx.request.body;

  const { error, value } = Training.schema.validate(form);
  if (error) {
    return ctx.render('admin/trainings/edit-training', {
      form: { ...form, errors: error.details },
      isNew: true,
    });
  }

  const training = Trainings.create(value as Partial<Training>);
  training.organizations = value.organizations.map(oid => ({ id: oid }));

  try {
    const newTraining = await Trainings.save(training);
    ctx.redirect(`/admin/trainings/${newTraining.id}`);
  } catch (err) {
    await ctx.render('admin/trainings/edit-training', {
      error: err.message,
      form: { ...value },
      isNew: true,
    });
  }
});

router.get('/:tid/edit', async ctx => {
  const { training } = ctx.state;
  return ctx.render('admin/trainings/edit-training', {
    form: { ...training, organizations: training.organizations.map(o => o.id) },
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
  submittedTraining.organizations = value.organizations.map(oid => ({
    id: oid,
  }));

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
