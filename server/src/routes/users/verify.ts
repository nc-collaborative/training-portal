import bcrypt from 'bcrypt';
import Router from 'koa-router';
import User, { UserStatus } from 'models/User';
import UserRole from 'models/UserRole';
import { getRepository } from 'typeorm';

const router = new Router();

const Users = getRepository(User);
const UserRoles = getRepository(UserRole);

let Learner: UserRole;

(async () => {
  Learner = (await UserRoles.findOne({ where: { name: 'learner' } }))!;
})();

router.get('/users/verify', async ctx => {
  const verifyToken = ctx.query.v as string;
  if (!verifyToken) throw ctx.throw(404);

  const [uid, token] = verifyToken.split(' ');

  let success;

  try {
    const user = await Users.findOne(uid);

    if (!user || user.verifyCode != token) throw ctx.throw(404);

    user.status = UserStatus.Active;
    user.userRoles.push(Learner);

    await Users.save(user);
    success = true;
  } catch (err) {
    success = false;
    ctx.status = 400;
  }

  await ctx.render('users/verify', { success });
});

export default router;
