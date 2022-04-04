import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  session: number;

  @Column()
  tag: string;

  @Column()
  inUse: number;
}
