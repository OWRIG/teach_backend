import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base';
import { User } from './user';
import { Video } from './video';

@EntityModel()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.comments)
  author: User;

  @ManyToOne(() => Video, video => video.comments)
  video: Video;

  @Column()
  content: string;

  @Column()
  likes: string;
}
