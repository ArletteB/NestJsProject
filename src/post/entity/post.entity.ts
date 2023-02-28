import { CategoryEntity } from 'src/category/entities/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Timestamp } from '../../Generic/timestamp.entity';
import { CommentEntity } from '../../comment/entities/comment.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('post')
export class PostEntity extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    default: false,
  })
  published: boolean;

  @ManyToMany(() => CategoryEntity, (category) => category.posts, {
    cascade: ['insert'],
  })
  @JoinTable()
  categories: CategoryEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  @JoinTable()
  comments: CommentEntity[];

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;
}
