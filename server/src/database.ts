import fg from 'fast-glob';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import config from './server.config.json';

const db = new Promise<Connection>(async (resolve, reject) => {
  const modelDefs = fg.sync([__dirname + '/models/**/*', '!**/*.map']);

  const entities = (await Promise.all(
    modelDefs.map(def => import(def as string)),
  )).map(module => module.default);

  try {
    const connection = await createConnection(
      Object.assign({}, config.database as ConnectionOptions, {
        type: 'mysql',
        charset: 'utf8mb4',
        entities,
      }),
    );

    resolve(connection);
  } catch (e) {
    reject(e);
  }
});

export default db;
