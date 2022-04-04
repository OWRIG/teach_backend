import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { USER_ROLE } from '../constant/orm';
import { Comment } from './comment';
import { Video } from './video';

@EntityModel()
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  name: string;

  @Column()
  subject: string;

  @Column()
  organization: string;

  @Column({
    unique: true,
  })
  stu_id: string;

  @Column()
  gender: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
    length: 140,
  })
  description: string;

  @Column()
  session: number;

  @Column({
    type: 'enum',
    enum: USER_ROLE,
    default: USER_ROLE.USER,
  })
  role: USER_ROLE;

  @OneToMany(() => Video, video => video.author)
  videos: Video[];

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];
}
