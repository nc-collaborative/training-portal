import Router from 'koa-router';
import { getRepository } from 'typeorm';

import Training from '../../../models/Training';
import TrainingAttempt from '../../../models/TrainingAttempt';

const router = new Router();
const Trainings = getRepository(Training);
const TrainingAttempts = getRepository(TrainingAttempt);

router.get('/admin/attempts/:aid', async ctx => {
  const { aid } = ctx.params;

  const attempt = await TrainingAttempts.findOne({
    where: { id: aid },
  });

  if (attempt === undefined) {
    return (ctx.status = 404);
  }

  const {
    user,
    trainingVersion: version,
    trainingVersion: { training },
  } = attempt;

  const attempts = await TrainingAttempts.find({
    where: { user: { id: attempt.user.id } },
  });

  const totalAttempts = attempts.length;
  const attemptNo = attempts.findIndex(a => a.id === attempt.id) + 1;

  await ctx.render('admin/view-attempt', {
    user,
    training,
    version,
    attempt,
    totalAttempts,
    attemptNo,
  });
});

export default router;
