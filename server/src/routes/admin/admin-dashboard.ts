import Router from 'koa-router';
import { getRepository } from 'typeorm';
import { assertRole } from '../../authn';
import Training from '../../models/Training';
import User from '../../models/User';
import UserRole from '../../models/UserRole';

const router = new Router();

const Trainings = getRepository(Training);
const Users = getRepository(User);

router.redirect('/admin', '/admin/dashboard');

router.get('/admin/dashboard', async ctx => {
  const counts: any = {};

  const users = await Users.find({ relations: ['attempts'] });
  counts.learners = users.filter(u => u.attempts.length).length;

  counts.trainings = await Trainings.count();
  await ctx.render('admin/dashboard', { counts });
});

export default router;
