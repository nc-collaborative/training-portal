import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class County {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true })
  name: string;
}
