import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Training from './Training';

@Entity()
export default class Organization {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('varchar', { unique: true })
  name: string;

  @Column('varchar', { unique: true, nullable: true })
  longName: string;

  @Column('varchar', { nullable: true })
  url: string;

  @Column('text')
  description: string;

  @Column('varchar', { nullable: true })
  logoPath: string;

  @OneToMany(type => Training, t => t.organization, { eager: true })
  @JoinTable()
  trainings: Training[];
}
