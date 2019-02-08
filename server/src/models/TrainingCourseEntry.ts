import {
  Entity,
  Index,
  PrimaryColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

import Training from './Training';
import TrainingCourse from './TrainingCourse';

@Entity()
@Index(['trainingCourse', 'order'], { unique: true })
export default class TrainingCourseEntry {
  @ManyToOne(type => TrainingCourse, ts => ts.trainings, { primary: true })
  @JoinColumn({ name: 'trainingCourseId' })
  trainingCourse: TrainingCourse;

  @ManyToOne(type => Training, training => training.courses, { primary: true })
  @JoinColumn({ name: 'trainingId' })
  training: Training;

  @Column('int')
  order: number;
}
