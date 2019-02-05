import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import County from './County';
import TrainingAttempt from './TrainingAttempt';
import UserRole from './UserRole';

import bcrypt from 'bcrypt';

import { AuthUser } from '../authn';
import { randToken } from '../utils/tokenUtils';

export enum UserStatus {
  Active = 'active',
  Deleted = 'deleted',
  Unverified = 'unverified',
  Suspended = 'suspended',
}

@Entity()
@Index(['email'], { unique: true })
export default class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  phash: string;

  @ManyToOne(type => County, { eager: true, nullable: true })
  county: County;

  @CreateDateColumn()
  readonly createdOn: Date;

  @ManyToMany(type => UserRole, ur => ur.users, { eager: true })
  @JoinTable()
  userRoles: UserRole[];

  @Column('varchar', { nullable: true })
  gender: string;

  @Column()
  needsPasswordReset: boolean;

  @OneToMany(type => TrainingAttempt, ta => ta.user, { eager: false })
  attempts: TrainingAttempt[];

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Unverified })
  status: string;

  @Column('varchar', { nullable: true })
  verifyCode: string;

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  toJSON(): AuthUser {
    const copy = Object.assign({}, this, {
      phash: undefined,
      verifyCode: undefined,
      userRoles: this.userRoles.map(r => r.name),
    });
    return copy;
  }

  @BeforeInsert()
  genVerifyCode() {
    this.verifyCode = randToken(32); // just a random string
  }
}
