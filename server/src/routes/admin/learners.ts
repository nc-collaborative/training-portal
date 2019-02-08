import Router from 'koa-router';
import { getRepository } from 'typeorm';
import User from '../../models/User';

const Users = getRepository(User);

const router = new Router();

router.get('/admin/learners', async ctx => {
  // TODO: better query
  const users = await Users.find({ relations: ['attempts'] });

  const learners = users.filter(u => u.attempts.length);

  await ctx.render('admin/learners/learners', { users: learners });
});

export default router;
