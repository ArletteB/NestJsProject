import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      return await this.commentRepository.save(createCommentDto);
    } catch (error) {
      throw new Error('Error creating comment');
    }
  }

  async findAll(queries) {
    let { order } = queries;
    const query = await this.commentRepository
      .createQueryBuilder('comment')
      .orderBy('comment.createdAt', order || 'DESC');
  }

  async findOne(id: number) {
    try {
      return await this.commentRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      const comment = await this.findOne(id);

      if (!comment) {
        throw new NotFoundException(`Comment #${id} not found`);
      }

      const commentUpdated = { ...comment, ...updateCommentDto };

      await this.commentRepository.save(commentUpdated);

      return commentUpdated;
    } catch (error) {}
  }

  async sofRemove(id: number) {
    try {
      return await this.commentRepository.softDelete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
