import Router from 'koa-router';
import { getRepository } from 'typeorm';

import { assertRole } from '../authn';
import User from '../models/User';

const router = new Router();

const Users = getRepository(User);

router.get('/profile', async ctx => {
  assertRole(ctx);

  const user = await Users.findOne({
    where: { id: ctx.state.authUser.id },
    relations: ['attempts'],
  });

  const uniqueTrainingIds = Array.from(
    new Set(user!.attempts.map(a => a.trainingVersion.training.id)),
  );
  const uniqueTrainings = uniqueTrainingIds.map(
    tid =>
      user!.attempts.find(a => a.trainingVersion.training.id == tid)!
        .trainingVersion.training,
  );

  const trainingEntries: any[] = [];

  uniqueTrainings.forEach(t => {
    let lastDate = user!.attempts
      .filter(a => a.trainingVersion.training.id == t.id)
      .reduce((d, a) => (a.updatedOn > d ? a.updatedOn : d), new Date(0));
    trainingEntries.push({ ...t, lastDate });
  });

  await ctx.render('profile', { user, trainings: trainingEntries });
});

export default router;
