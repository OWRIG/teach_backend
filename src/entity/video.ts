import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base';
import { User } from './user';
import { Comment } from './comment';

@EntityModel()
export class Video extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.videos)
  author: User;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  likes: string;

  @OneToMany(() => Comment, comment => comment.video)
  comments: Comment[];
}
