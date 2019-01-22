import {
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';

@Entity()
export default class UserSession {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @OneToOne(type => User)
  @JoinColumn()
  userId: number;

  @Column('datetime', { nullable: false })
  expires: Date;

  @BeforeUpdate()
  refresh() {
    this.expires = new Date(Date.now() + 24 * 3600 * 1000);
  }
}
