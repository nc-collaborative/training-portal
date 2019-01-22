import Router from 'koa-router';
import { createQueryBuilder, getRepository } from 'typeorm';
import Training from '../../models/Training';
import TrainingAttempt, {
  TrainingAttemptStatus,
} from '../../models/TrainingAttempt';
import TrainingVersion from '../../models/TrainingVersion';
import User from '../../models/User';

const router = new Router();

const Trainings = getRepository(Training);
const TrainingAttempts = getRepository(TrainingAttempt);

// TODO: extract common route prefix, nested entity fetching / verifying

router.post('/learner/trainings/:tid/versions/:vid/attempt', async ctx => {
  // TODO: make sure allowed to submit attempt for this training + version

  const attempt = new TrainingAttempt();
  attempt.answer = ctx.request.body;
  attempt.user = { id: ctx.state.authUser.id } as any;
  attempt.trainingVersion = { id: parseInt(ctx.params.vid, 10) } as any;
  attempt.status = TrainingAttemptStatus.Complete;

  const { id } = await TrainingAttempts.save(attempt);
  const savedAttempt = await TrainingAttempts.findOne(id);
  savedAttempt!.calculateGrade();
  await TrainingAttempts.save(savedAttempt!);
  ctx.response.body = savedAttempt;
});

router.get('/trainings/:tid/versions/:vid/attempts/:aid', async ctx => {
  const { tid, vid, aid } = ctx.params;
  const { authUser } = ctx.state;

  const attempts = await TrainingAttempts.find({
    where: {
      user: { id: authUser.id },
      trainingVersion: { id: vid, training: { id: tid } },
      status: TrainingAttemptStatus.Complete,
    },
    order: {
      createdOn: 'ASC',
    },
  });

  const attempt = attempts.find(a => a.id == aid);

  if (!attempt) throw ctx.throw(404);

  const attemptNo = attempts.indexOf(attempt) + 1;

  await ctx.render('learner/view-attempt', {
    training: attempt.trainingVersion.training,
    version: attempt.trainingVersion,
    attempt,
    attempts,
    attemptNo,
  });
});

export default router;
