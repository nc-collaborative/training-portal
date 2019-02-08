import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Training from './Training';

import Joi from 'joi';
import * as valid from 'utils/validation';

@Entity()
export default class Organization {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('varchar', { unique: true })
  name: string;

  @Column('varchar', { unique: true, nullable: true })
  shortName: string;

  @Column('varchar', { nullable: true })
  url: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { nullable: true })
  logoPath: string;

  @ManyToMany(type => Training, t => t.organizations, { eager: true })
  @JoinTable()
  trainings: Training[];

  static schema = Joi.object().keys({
    name: valid.varchar.required(),
    shortName: valid.varchar,
    url: valid.varchar.uri().label('website'),
    description: valid.text,
    logoPath: valid.varchar,
  });
}
