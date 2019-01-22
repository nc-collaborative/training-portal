import TrainingVersion from 'models/TrainingVersion';
import db from '../database';

(async () => {
  const Connection = await db;

  const TrainingVersions = Connection.getRepository(TrainingVersion);

  const versions = await TrainingVersions.find();

  for (const v of versions) {
    const obj = JSON.parse(v.content.toString());
    v.content = obj;
    await TrainingVersions.save(v);
    console.log('Saved version ', v.id);
  }

  console.log('DONE');
})().catch(e => {
  console.error('ERROR:');
  console.error(e);
});
