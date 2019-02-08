import Router from 'koa-router';
import { getRepository } from 'typeorm';

import { assertRole } from '../authn';
import User from '../models/User';

const router = new Router();

const Users = getRepository(User);

router.get('/profile', async ctx => {
  assertRole(ctx);

  const user = await Users.findOne({ where: { id: ctx.state.authUser.id } });
  await ctx.render('profile', { user });
});

export default router;
