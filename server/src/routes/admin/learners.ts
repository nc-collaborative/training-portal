import Router from 'koa-router';
import { getRepository } from 'typeorm';
import User from '../../models/User';

const Users = getRepository(User);

const router = new Router();

router.get('/admin/learners', async ctx => {
  const users = await Users.find({ relations: ['attempts'] });

  await ctx.render('admin/learners/learners', { users });
});

export default router;
