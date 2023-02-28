import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateDto } from './entity/post-create.dto';
import { PostUpdateDto } from './entity/post-update.dto copy 3';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  getAllPosts(@Query() queries) {
    return this.postService.getAllPosts(queries);
  }

  @Get(':id')
  getOnePostById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getOnePostById(id);
  }

  @Post()
  createPost(@Body() data: PostCreateDto) {
    console.log(data);
    return this.postService.createPost(data);
  }

  @Put(':id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: PostUpdateDto,
  ) {
    return this.postService.updatePost(id, data);
  }

  @Delete(':id')
  softDeletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.softDeletePost(id);
  }
}
