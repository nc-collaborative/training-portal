import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Organization from './Organization';
import TrainingCategory from './TrainingCategory';
import TrainingVersion, { TrainingVersionStatus } from './TrainingVersion';
import User from './User';

import config from '../server.config.json';

export enum TrainingStatus {
  Draft = 'draft',
  Active = 'active',
  Retired = 'retired',
}

@Entity()
export default class Training {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('varchar', { nullable: true })
  shortDescription: string;

  @Column('text')
  longDescription: string;

  @ManyToOne(type => User)
  author: User;

  @ManyToOne(type => Organization)
  organization: Organization;

  @Column('int')
  hours: number;

  @Column({ type: 'enum', enum: TrainingStatus })
  status: string;

  @Column()
  isGraded: boolean;

  @Column('int')
  passPercent: number;

  @OneToMany(type => TrainingVersion, tv => tv.training)
  versions: TrainingVersion[];

  @ManyToMany(type => TrainingCategory, tc => tc.trainings, { eager: true })
  categories: TrainingCategory[];

  /**
   * How long trainees must wait after completing a training to give written
   * feedback on the training.
   *
   * null = do not accept any feedback
   *    0 = acccept feedback immediately
   * 1..n = trainees must wait n days
   */
  @Column('int')
  allowFeedbackAfterDays: number;

  get currentVersion(): TrainingVersion | undefined {
    return this.versions.find(v => v.status == TrainingVersionStatus.Active);
  }

  get publicURL() {
    return `https://${config.host}/training/${this.id}`;
  }
}
