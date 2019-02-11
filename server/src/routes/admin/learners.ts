import Router from 'koa-router';
import { getRepository } from 'typeorm';
import User from 'models/User';

const Users = getRepository(User);

const router = new Router();

router.get('/admin/learners', async ctx => {
  const users = await Users.createQueryBuilder('user')
    .innerJoinAndSelect('user.attempts', 'attempt')
    .orderBy('attempt.updatedOn', 'DESC')
    .getMany();

  const userEntries = users.map(u => ({
    ...u,
    lastTrainingDate: u.attempts[0].updatedOn,
  }));

  await ctx.render('admin/learners/learners', { users: userEntries });
});

export default router;
