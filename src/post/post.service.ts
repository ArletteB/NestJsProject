import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostCreateDto } from './entity/post-create.dto';
import { PostUpdateDto } from './entity/post-update.dto copy 3';
import { PostEntity } from './entity/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async getAllPosts(queries) {
    let { page, limit, search, order, published, categories } = queries;
    console.log(categories);

    limit = limit ? +limit : 10;

    const query = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.categories', 'categories');
    // .orderBy('post.createdAt', 'DESC')

    if (published !== undefined) {
      query.andWhere('post.published = :published', { published });
    }

    const postList = query.limit(limit).getMany();

    return postList;
  }

  async getOnePostById(id: number) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.categories', 'categories')
      .where('post.id = :id', { id })
      .getOne();

    return post;
  }

  async createPost(data: PostCreateDto) {
    try {
      return await this.postRepository.save(data);
    } catch (error) {
      throw new Error('Error creating post');
    }
  }

  async updatePost(id: number, data: PostUpdateDto) {
    try {
      const post = await this.postRepository.findOneBy({ id });
      const updatedPost = { ...post, ...data };
      await this.postRepository.save(updatedPost);

      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  }

  async softDeletePost(id: number) {
    try {
      return await this.postRepository.softDelete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
