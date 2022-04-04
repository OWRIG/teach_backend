import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel()
export class Organization {
  @PrimaryGeneratedColumn()
  organization_id: number;

  @Column()
  name: string;

  @Column()
  abbr: string;
}
