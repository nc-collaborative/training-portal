import Router from 'koa-router';
import Organization from 'models/Organization';
import { getRepository } from 'typeorm';
import User from '../../models/User';
import { validate } from '../../validator';

const Users = getRepository(User);

const Organizations = getRepository(Organization);

const router = new Router();

router.get('/admin/orgs', async ctx => {
  const orgs = await Organizations.find();

  await ctx.render('admin/organizations/organizations', { orgs });
});

router.get('/admin/orgs/:oid', async ctx => {
  const org = await Organizations.findOne(ctx.params.oid);
  if (!org) throw ctx.throw(404);

  await ctx.render('admin/organizations/view-org', { org });
});

router.get('/admin/orgs/:oid/edit', async ctx => {
  const { oid } = ctx.params;

  let org;

  if (oid != 'new') {
    org = await Organizations.findOne(ctx.params.oid);
    if (!org) throw ctx.throw(404);
  } else {
    org = { id: 'new' };
  }

  await ctx.render('admin/organizations/edit-org', { org, form: org });
});

router.post('/admin/orgs/:oid/edit', async ctx => {
  let { oid } = ctx.params;
  let org: Organization | undefined;
  const isNew = oid == 'new';

  if (isNew) {
    org = new Organization();
  } else {
    oid = parseInt(oid, 10);
    org = await Organizations.findOne(oid);
    if (!org) return (ctx.status = 404);
  }

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

  if (oid == 'new') delete form.id;

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

export default router;
