import { Entity, PrimaryColumn, Column, getRepository } from 'typeorm';

import Joi from 'joi';
import * as valid from 'utils/validation';

import config from '../server.config.json';

@Entity()
export default class SystemSettings {
  @PrimaryColumn()
  id: number;

  @Column('boolean')
  maintenance: boolean;

  @Column('varchar')
  contactEmail: string;

  private static settings: SystemSettings;

  static async getSettings() {
    if (SystemSettings.settings) return SystemSettings.settings;

    const repo = getRepository(SystemSettings);
    let settings = await repo.findOne(1);
    if (!settings) {
      settings = await repo.save(
        repo.create({
          id: 1,
          maintenance: false,
          contactEmail: `no-reply@${config.host}`,
        }),
      );
    }
    SystemSettings.settings = settings;
    return settings;
  }

  static async update(s: Partial<SystemSettings>) {
    const repo = getRepository(SystemSettings);
    const m = await repo.preload({ ...s, id: 1 });
    const settings = await repo.save(m!);
    SystemSettings.settings = settings;
    return settings;
  }

  static schema = Joi.object().keys({
    maintenance: valid.checkbox,
    contactEmail: valid.varchar.email().required(),
  });
}
