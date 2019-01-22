# Helping Hands Training Portal

A project of the [NC Collaborative for Children, Youth and Families](https://nccollaborative.org)

## Contents

The application is roughly broken into two overall components: `server` and `browser`. Each has its own npm setup (`cd... npm install` in both).

### Server

- `views` - nunjucks templates
- `src` - TypeScript source for server-side application
  - `server.ts` - application entry point
  - `models` - TypeORM model definitions / entity classes
  - `routes` - collections of application route controllers
  - `@types` - extra project-specific typedefs to augment third party library types

### Browser

- `browser`

  - `src` - TypeScript source for browser-side scripts

- `static` - catch-all for serving static assets; should be served directly by
  apache / nginx
