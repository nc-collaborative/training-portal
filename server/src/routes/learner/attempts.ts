import Router from 'koa-router';
import { getRepository } from 'typeorm';
import { BadRequest as BadRequestError } from 'http-errors';

import Training, { TrainingStatus } from 'models/Training';
import TrainingAttempt, { TrainingAttemptStatus } from 'models/TrainingAttempt';
import TrainingVersion, { TrainingVersionStatus } from 'models/TrainingVersion';

import { assertRole } from '../../authn';

const router = new Router();

const Trainings = getRepository(Training);
const TrainingVersions = getRepository(TrainingVersion);
const TrainingAttempts = getRepository(TrainingAttempt);

router.use(async (ctx, next) => {
  assertRole(ctx);
  return next();
});

router.param('tid', async (id, ctx, next) => {
  const training = await Trainings.findOne(id);
  if (!training) throw ctx.throw(404);
  ctx.state.training = training;
  return next();
});

router.param('vid', async (id, ctx, next) => {
  const version = await TrainingVersions.findOne(id);
  if (!version) throw ctx.throw(404);
  ctx.state.version = version;
  return next();
});

router.param('aid', async (id, ctx, next) => {
  const attempt = await TrainingAttempts.findOne(id);
  if (!attempt) throw ctx.throw(404);
  ctx.state.attempt = attempt;
  return next();
});

router.post('/learner/trainings/:tid/versions/:vid/attempt', async ctx => {
  const { training, version, authUser } = ctx.state;

  // Make sure the specified training is accepting new attempts
  if (
    training.status != TrainingStatus.Active ||
    version.status != TrainingVersionStatus.Active
  ) {
    throw new BadRequestError(
      'The training is no longer accepting new attempts.',
    );
  }

  const attempt = TrainingAttempts.create({
    user: authUser,
    trainingVersion: version,
    answer: ctx.request.body,
    status: TrainingAttemptStatus.Complete,
  });

  attempt.calculateGrade();

  await TrainingAttempts.save(attempt);

  ctx.response.body = attempt;
});

router.get('/trainings/:tid/versions/:vid/attempts/:aid', async ctx => {
  const { version, attempt, authUser } = ctx.state;

  const allUserAttempts = await TrainingAttempts.find({
    where: {
      user: { id: authUser.id },
      trainingVersion: { id: version.id },
    },
  });

  const attemptNo = allUserAttempts.findIndex(a => a.id == attempt.id) + 1;

  await ctx.render('learner/view-attempt', {
    training: attempt.trainingVersion.training,
    version: attempt.trainingVersion,
    attempt,
    attempts: allUserAttempts,
    attemptNo,
  });
});

export default router;
