import Router from 'koa-router';
import { getRepository } from 'typeorm';
import { assertRole } from '../../authn';
import Training from '../../models/Training';
import User from '../../models/User';
import UserRole from '../../models/UserRole';

const router = new Router();

const Trainings = getRepository(Training);
const Users = getRepository(User);
const UserRoles = getRepository(UserRole);

router.redirect('/admin', '/admin/dashboard');

router.get('/admin/dashboard', async ctx => {
  const counts: any = {};

  const learnerRole: any = await UserRoles.createQueryBuilder('urole')
    .loadRelationCountAndMap('urole.userCount', 'urole.users')
    .where('urole.name = "learner"')
    .getOne();

  counts.learners = learnerRole.userCount;

  counts.trainings = await Trainings.count();
  await ctx.render('admin/dashboard', { counts });
});

export default router;
