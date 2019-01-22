import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class EmailRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdOn: Date;

  @Column('text', { nullable: true })
  to: string;

  @Column('text', { nullable: true })
  cc: string;

  @Column('text', { nullable: true })
  bcc: string;

  @Column('text')
  from: string;

  @Column('text', { nullable: true })
  replyTo: string;

  @Column('text')
  subject: string;

  // @Column('mediumtext')
  // body: string;
}
