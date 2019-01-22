import Koa from 'koa';
import User from '../../models/User';

interface authUser extends Pick<User, Exclude<keyof User, 'userRoles'>> {
  userRoles: string[];
}

declare module 'koa' {
  interface Context {
    render: (viewName: string, state?: object) => Promise<void>;
  }
}
