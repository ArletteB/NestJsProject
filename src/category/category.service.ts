import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryRepository.save(createCategoryDto);
    } catch (error) {
      throw new Error('Error creating category');
    }
  }

  async findAll() {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.categoryRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.findOne(id);
      if (!category) {
        throw new NotFoundException(`Category #${id} not found`);
      }
      const categoryUpdated = { ...category, ...updateCategoryDto };

      await this.categoryRepository.save(categoryUpdated);

      return categoryUpdated;
    } catch (error) {
      console.log(error);
    }
  }

  async sofRemove(id: number) {
    try {
      return await this.categoryRepository.softDelete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
