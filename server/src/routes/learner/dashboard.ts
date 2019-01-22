import Router from 'koa-router';
import { createQueryBuilder, getRepository } from 'typeorm';
import Training from '../../models/Training';
import TrainingAttempt, {
  TrainingAttemptStatus,
} from '../../models/TrainingAttempt';
import TrainingVersion from '../../models/TrainingVersion';

const Trainings = getRepository(Training);
const TrainingAttempts = getRepository(TrainingAttempt);

const router = new Router();

router.get('/learner/dashboard', async ctx => {
  const attempts = await TrainingAttempts.find({
    where: { user: { id: ctx.state.authUser.id } },
    order: {
      updatedOn: 'DESC',
    },
  });

  const completeTrainingIds = Array.from(
    new Set(
      attempts
        .filter(a => a.status == TrainingAttemptStatus.Complete)
        .map(a => a.trainingVersion.training.id),
    ),
  );

  const incompleteTrainingIds = Array.from(
    new Set(
      attempts
        .filter(a => a.status == TrainingAttemptStatus.InProgress)
        .map(a => a.trainingVersion.training.id),
    ),
  );

  const [completeTrainings, incompleteTrainings] = await Promise.all([
    Trainings.findByIds(completeTrainingIds),
    Trainings.findByIds(incompleteTrainingIds),
  ]);

  type DisplayTraining = Training & { lastAttempt?: TrainingAttempt };

  for (const t of [
    ...completeTrainings,
    ...incompleteTrainings,
  ] as DisplayTraining[]) {
    t.lastAttempt = attempts.find(a => a.trainingVersion.training.id == t.id);
  }

  await ctx.render('learner/dashboard', {
    attempts,
    completeTrainings,
    incompleteTrainings,
  });
});

export default router;
