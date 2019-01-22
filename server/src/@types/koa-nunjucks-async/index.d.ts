declare module 'koa-nunjucks-async' {
  import { Middleware } from 'koa';
  export default function(viewsDir: string, opts: object): Middleware;
}
