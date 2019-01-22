import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Training from './Training';

@Entity()
export default class TrainingCategory {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('varchar', { unique: true })
  name: string;

  @ManyToMany(type => Training, t => t.categories)
  @JoinTable()
  trainings: Training[];
}
