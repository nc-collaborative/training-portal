import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

@Entity()
export default class UserRole {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('varchar', { unique: true })
  name: string;

  @ManyToMany(type => User, user => user.userRoles)
  users: User[];

  toJSON() {
    return this.name;
  }
}
