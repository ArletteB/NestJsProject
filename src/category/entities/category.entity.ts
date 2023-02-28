import { PostEntity } from 'src/post/entity/post.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from 'src/Generic/timestamp.entity';

@Entity('category')
export class CategoryEntity extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @ManyToMany(() => PostEntity, (post) => post.categories)
  posts: PostEntity[];
}
