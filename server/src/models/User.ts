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

import * as Joi from 'joi';
import bcrypt from 'bcrypt';

import config from '../server.config.json';
import { AuthUser } from '../authn';

import { randToken } from 'utils/tokenUtils';
import * as valid from 'utils/validation';

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

  @Column('varchar', { nullable: true })
  passwordResetToken: string | null;

  @ManyToOne(type => County, { eager: true, nullable: true })
  county: County;

  @CreateDateColumn()
  readonly createdOn: Date;

  @ManyToMany(type => UserRole, ur => ur.users, { eager: true })
  @JoinTable()
  userRoles: UserRole[];

  @Column('varchar', { nullable: true })
  gender: string;

  @OneToMany(type => TrainingAttempt, ta => ta.user, { eager: false })
  attempts: TrainingAttempt[];

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Unverified })
  status: string;

  @Column('varchar', { nullable: true })
  verifyCode: string;

  @Column('timestamp', { nullable: true })
  lastLoggedIn: Date;

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

  async setPassword(pass) {
    this.phash = await bcrypt.hash(pass, config.bcryptHashRounds);
  }

  static async generateNewPass() {
    const pword = randToken(16);
    const phash = await bcrypt.hash(pword, config.bcryptHashRounds);
    return { pword, phash };
  }

  static schema = Joi.object().keys({
    firstName: valid.varchar.required().label('First name'),
    lastName: valid.varchar.required().label('Last name'),
    email: valid.varchar.email().required(),
    gender: valid.varchar.lowercase(),
    countyId: Joi.number()
      .integer()
      .empty('')
      .default(null),
    userRoleIds: Joi.array()
      .items(Joi.number().integer())
      .default([]),
  });
}
