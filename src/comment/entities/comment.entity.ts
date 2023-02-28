import { PostEntity } from 'src/post/entity/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Timestamp } from '../../Generic/timestamp.entity';

@Entity('comment')
export class CommentEntity extends Timestamp {
  @PrimaryColumn()
  id: number;

  @Column({
    nullable: false,
  })
  comment: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  createdAt: Date;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;
}
