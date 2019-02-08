import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import TrainingCourseEntry from './TrainingCourseEntry';

import Joi from 'joi';
import * as valid from 'utils/validation';

@Entity()
export default class TrainingCourse {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('varchar')
  title: string;

  @OneToMany(type => TrainingCourseEntry, t => t.trainingCourse, {
    eager: true,
  })
  trainings: TrainingCourseEntry[];

  static schema = Joi.object().keys({
    title: valid.varchar.required(),
  });
}
