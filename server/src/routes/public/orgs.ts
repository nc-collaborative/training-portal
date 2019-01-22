import Router from 'koa-router';
import Organization from 'models/Organization';
import { TrainingStatus } from 'models/Training';
import { getRepository } from 'typeorm';

const router = new Router();

const Orgs = getRepository(Organization);

router.get('/orgs', async ctx => {
  const orgs = await Orgs.find();
  await ctx.render('public/orgs/orgs', { orgs });
});

router.get('/orgs/:oid', async ctx => {
  const org = await Orgs.findOne(ctx.params.oid);
  if (!org) throw ctx.throw(404);

  org.trainings = org.trainings.filter(t => t.status == TrainingStatus.Active);

  await ctx.render('public/orgs/org-detail', { org });
});

export default router;
