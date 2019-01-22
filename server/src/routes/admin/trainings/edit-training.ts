import Router from 'koa-router';
import { createQueryBuilder, DeepPartial, getRepository } from 'typeorm';
import Training from '../../../models/Training';
import TrainingVersion from '../../../models/TrainingVersion';
import { validate } from '../../../validator';

const router = new Router();
const Trainings = getRepository(Training);
const TrainingVersions = getRepository(TrainingVersion);

router.get('/admin/trainings/new', async ctx => {
  await ctx.render('admin/training/new-training', { new: true });
});

router.post('/admin/trainings/new', async ctx => {
  const training = Trainings.create(ctx.request.body as Partial<Training>);
  const errors = await validate(training);
  if (errors.length) {
    return await ctx.render('admin/training/new-training', {
      form: { ...training, errors },
    });
  }

  try {
    const newTraining = await Trainings.save(training);
    ctx.redirect(`/admin/trainings/${newTraining.id}/edit`);
  } catch (error) {
    await ctx.render('admin/training/new-training', {
      form: { ...training, error },
    });
  }
});

router.get('/admin/trainings/:id/edit', async ctx => {
  const training = await Trainings.findOne(ctx.params.id);

  if (!training) {
    ctx.throw(404);
  }

  return await ctx.render('admin/trainings/edit-training', {
    form: { ...training },
    training,
  });
});

router.post('/admin/trainings/:tid/edit', async ctx => {
  const tid = parseInt(ctx.params.tid, 10);

  const training = await Trainings.findOne(tid);

  if (!training) return (ctx.status = 404);

  const form = ctx.request.body;
  form.isGraded = 'isGraded' in form;

  const submittedTraining = Trainings.merge(training, form);
  const errors = await validate(submittedTraining);
  if (errors.length) {
    return await ctx.render('admin/trainings/edit-training', {
      form: { ...submittedTraining, errors },
      training: submittedTraining,
    });
  }

  try {
    const updatedTraining = await Trainings.save(submittedTraining);
    // Save was successful, redirect back to view training
    return ctx.redirect(`/admin/trainings/${tid}`);
  } catch (error) {
    await ctx.render('admin/trainings/edit-training', {
      form: { ...submittedTraining, error },
      training: submittedTraining,
    });
  }
});

export default router;
