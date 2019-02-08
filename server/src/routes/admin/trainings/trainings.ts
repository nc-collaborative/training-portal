import Router from 'koa-router';

import { getRepository } from 'typeorm';
import Training from 'models/Training';
import TrainingVersion from 'models/TrainingVersion';

const Trainings = getRepository(Training);
const TrainingVersions = getRepository(TrainingVersion);

const router = new Router().prefix('/admin/trainings');

router.get('/', async ctx => {
  const trainings = await Trainings.find();
  await ctx.render('admin/trainings/index', { trainings });
});

router.get('/:tid', async ctx => {
  const tid = parseInt(ctx.params.tid, 10);

  const training = await Trainings.findOne({
    where: { id: tid },
    relations: ['organizations', 'versions', 'versions.attempts'],
  });

  if (!training) return (ctx.status = 404);

  // order by newest versions first
  training.versions.sort((a, b) => Number(b.updatedOn) - Number(a.updatedOn));

  await ctx.render('admin/trainings/view-training', { training });
});

// router.get('/admin/training/:tid', async)

export default router;
