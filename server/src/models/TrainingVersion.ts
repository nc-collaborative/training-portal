import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Training from './Training';
import TrainingAttempt from './TrainingAttempt';

export enum TrainingVersionStatus {
  Active = 'active',
  Inactive = 'inactive',
  Deleted = 'deleted',
}

@Entity()
export default class TrainingVersion {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(type => Training, { eager: true })
  training: Training;

  @Column('json')
  content: VersionContent;

  @Column({
    type: 'enum',
    enum: TrainingVersionStatus,
    default: TrainingVersionStatus.Inactive,
  })
  status: string;

  @CreateDateColumn()
  readonly createdOn: Date;

  @UpdateDateColumn()
  readonly updatedOn: Date;

  @OneToMany(type => TrainingAttempt, ta => ta.trainingVersion, {
    eager: false,
  })
  attempts: TrainingAttempt[];
}

interface VersionContent {
  pages: [
    {
      name: string;
      elements: [
        {
          type: string;
          name: string;
          isRequired: boolean;
          correctAnswer: string;
        }
      ];
    }
  ];
}
