import { ParameterizedContext } from 'koa';
import Router from 'koa-router';
import Training, { TrainingStatus } from 'models/Training';
import TrainingAttempt from 'models/TrainingAttempt';
import TrainingVersion, { TrainingVersionStatus } from 'models/TrainingVersion';
import { getRepository } from 'typeorm';

const router = new Router({ prefix: '/admin/trainings/:tid/versions' });

const TrainingAttempts = getRepository(TrainingAttempt);
const TrainingVersions = getRepository(TrainingVersion);
const Trainings = getRepository(Training);

router.get('/:vid/edit', async ctx => {
  const tid = parseInt(ctx.params.tid, 10);
  const vid = parseInt(ctx.params.vid, 10);

  const version = await TrainingVersions.findOne(vid);
  if (!version || version.training.id !== tid) {
    ctx.throw(404);
  }

  const attempts = await TrainingAttempts.find({
    where: { trainingVersion: { id: vid } },
  });

  await ctx.render('admin/trainings/versions/edit-version', {
    version,
    form: { ...version },
    attempts,
    canEdit: !attempts.length,
  });
});

// endpoint to programmatically receive updates from survey builder frontend
router.put('/:vid/update', async ctx => {
  const version = await getVersion(ctx);

  const attempts = await TrainingAttempts.find({
    where: { trainingVersion: { id: version.id } },
  });

  if (attempts.length) {
    ctx.throw(501);
  }

  try {
    let { content } = ctx.request.body;
    content = JSON.parse(content);
    const updatedVersion = (await TrainingVersions.preload({
      id: version.id,
      content,
    })) as TrainingVersion;
    await TrainingVersions.save(updatedVersion);
    return (ctx.status = 200);
  } catch (e) {
    ctx.throw(500, e.message);
  }
});

router.post('/:vid/copy', async ctx => {
  const version = await getVersion(ctx);

  const newVersion = await TrainingVersions.save({
    ...version,
    id: undefined,
    status: TrainingVersionStatus.Inactive,
  });

  ctx.response.body = newVersion;
});

router.post('/:vid/publish', async ctx => {
  const version = await getVersion(ctx);

  // Clear possible publish status of other versions
  await TrainingVersions.createQueryBuilder('version')
    .update({ status: TrainingVersionStatus.Inactive })
    .where('trainingId = :tid', { tid: version.training.id })
    .execute();

  version.status = TrainingVersionStatus.Active;
  await TrainingVersions.save(version);

  await Trainings.update(version.training.id, {
    status: TrainingStatus.Active,
  });

  ctx.response.body = version;
});

router.delete('/:vid/publish', async ctx => {
  const version = await getVersion(ctx);

  version.status = TrainingVersionStatus.Inactive;
  await TrainingVersions.save(version);

  await Trainings.update(version.training.id, {
    status: TrainingStatus.Draft,
  });

  ctx.response.body = version;
});

export default router;

/**
 * Gets a TrainingVersion for a route and ensures that it is associated
 * with the correct Training, else throws NotFound
 */
async function getVersion(
  ctx: ParameterizedContext<{}, Router.IRouterContext>,
) {
  let { tid, vid } = ctx.params;
  tid = parseInt(tid, 10);
  vid = parseInt(vid, 10);

  const version = await TrainingVersions.findOne(vid);
  if (!version || version.training.id !== tid) {
    throw ctx.throw(404);
  }

  return version;
}
