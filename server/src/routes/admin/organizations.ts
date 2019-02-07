import Router from 'koa-router';
import Organization from 'models/Organization';
import { getRepository } from 'typeorm';
import { validate } from '../../validator';

const Organizations = getRepository(Organization);

const router = new Router({ prefix: '/admin/orgs' });

router.param('oid', async (id, ctx, next) => {
  let org = await Organizations.findOne(id);
  if (!org) throw ctx.throw(404);

  ctx.state.org = org;
  return next();
});

router.get('/', async ctx => {
  const orgs = await Organizations.find();
  await ctx.render('admin/organizations/organizations', { orgs });
});

router.get('/:oid(\\d+)', async ctx => {
  await ctx.render('admin/organizations/view-org', { org: ctx.state.org });
});

router.get('/:oid/edit', async ctx => {
  const { org } = ctx.state;
  await ctx.render('admin/organizations/edit-org', { org, form: org });
});

router.post('/:oid/edit', async ctx => {
  const org = ctx.state.org;
  const form = ctx.request.body;

  const submittedOrg = Organizations.merge(org, form);
  const errors = await validate(submittedOrg);
  if (errors.length) {
    ctx.status = 400;
    return await ctx.render('admin/organizations/edit-org', {
      form: { ...submittedOrg, errors },
      org: submittedOrg,
    });
  }

  try {
    const { id } = await Organizations.save(submittedOrg);
    const updatedOrg = await Organizations.findOne(id);
    // Save was successful, redirect back to view org
    return ctx.redirect(`/admin/orgs/${updatedOrg!.id}`);
  } catch (error) {
    ctx.status = 401;
    await ctx.render('admin/organizations/edit-org', {
      form: { ...submittedOrg, error },
      org: submittedOrg,
    });
  }
});

router.get('/new', async ctx => {
  await ctx.render('admin/organizations/edit-org', { isNew: true });
});

router.post('/new', async ctx => {
  let form = ctx.request.body;
  let org = Organizations.create([form])[0];

  try {
    const newOrg = await Organizations.save(org);
    return ctx.redirect(`/admin/orgs/${newOrg.id}`);
  } catch (error) {
    ctx.status = 401;
    await ctx.render('admin/organizations/edit-org', {
      form: { ...form, error },
      org: form,
    });
  }
});

export default router;
