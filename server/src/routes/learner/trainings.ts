import Router from 'koa-router';
import { getRepository } from 'typeorm';
import Training, { TrainingStatus } from '../../models/Training';
import TrainingAttempt, {
  TrainingAttemptStatus,
} from '../../models/TrainingAttempt';
import TrainingVersion, {
  TrainingVersionStatus,
} from '../../models/TrainingVersion';

const router = new Router();
const Trainings = getRepository(Training);
const TrainingAttempts = getRepository(TrainingAttempt);

router.get('/trainings', async ctx => {
  const trainings = await Trainings.find({
    where: { status: TrainingStatus.Active },
  });
  await ctx.render('learner/trainings', { trainings });
});

router.get('/trainings/:tid', async ctx => {
  let { tid } = ctx.params;
  tid = parseInt(tid, 10);

  const training = await Trainings.createQueryBuilder('training')
    .innerJoinAndMapOne(
      'training.currentVersion',
      'training.versions',
      'version',
      'version.status = :status',
      { status: TrainingVersionStatus.Active },
    )
    .where('training.id = :tid', { tid })
    .getOne();

  if (!training) throw ctx.throw(404);

  let attempts: TrainingAttempt[] | undefined;

  if (ctx.state.authUser) {
    // HACK: there is probably a better way to do this with a querybuilder
    const allAttempts = await TrainingAttempts.find({
      where: {
        user: { id: ctx.state.authUser.id },
        // trainingVersion: { training: { id: training.id } }, // bc this doesn't work for some reason
      },
    });

    attempts = allAttempts.filter(
      at => at.trainingVersion.training.id == training.id,
    );
  }

  await ctx.render('learner/view-training', { training, attempts });
});

router.get('/trainings/:tid/take', async ctx => {
  if (!ctx.state.authUser) {
    ctx.redirect(`/login?redirect=${encodeURIComponent(ctx.request.path)}`);
  }

  let { tid } = ctx.params;
  tid = parseInt(tid, 10);

  const aid = ctx.params.aid;
  let attempt;

  if (aid) {
    attempt = await TrainingAttempts.findOne({
      where: { id: aid, trainingVersion: { training: { id: tid } } },
    });
    if (attempt) {
      if (attempt.status == TrainingAttemptStatus.Complete) {
        // If the attempt is already marked as complete,
        // redirect to view that attempt
        ctx.redirect(
          `/trainings/${tid}/versions/${
            attempt.trainingVersion.id
          }/attempts/${aid}`,
        );
      }
    }
  }

  const training = await Trainings.findOne({
    where: { id: tid, status: TrainingStatus.Active },
    relations: ['versions'],
  });

  if (!training) throw ctx.throw(404);

  const version = attempt ? attempt.trainingVersion : training.currentVersion;

  await ctx.render('learner/take-training', { training, version, attempt });
});

export default router;
