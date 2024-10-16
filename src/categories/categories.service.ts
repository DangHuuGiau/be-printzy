import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { Product } from '@products/entities/product.entity';
import mapQueryToFindOptions from '@utils/map-query-to-find-options';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FindCategoryDto } from './dto/find-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectConnection() private connection: Connection,
  ) {}

  public async create(createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepository.save(createCategoryDto);
  }

  public async findAll(query: FindCategoryDto) {
    const isPaginationDisabled = query.disablePagination;
    delete query.disablePagination;

    const findOptions = mapQueryToFindOptions(query);

    if (isPaginationDisabled) {
      delete findOptions.take;
    }

    const [data, total] = await this.categoriesRepository.findAndCount({
      ...findOptions,
      relations: ['collections'],
    });

    return {
      $limit: findOptions.take,
      $skip: findOptions.skip,
      total,
      data,
    };
  }

  public async findOne(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new UnprocessableEntityException('Category is not found');
    }

    return category;
  }

  public async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new UnprocessableEntityException('Category is not found');
    }

    const updatedCategory = await this.categoriesRepository.save({
      id,
      ...updateCategoryDto,
    });

    return updatedCategory;
  }

  public async remove(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!category) {
      throw new UnprocessableEntityException('Category is not found');
    }

    return new Promise((resolve) => {
      this.connection.transaction(async (entityManager) => {
        await Promise.all(
          category.products.map(async ({ id }) => {
            return await entityManager.save(Product, {
              id,
              isDeleted: true,
            });
          }),
        );

        resolve(
          await entityManager.save(Category, {
            id,
            isDeleted: true,
          }),
        );
      });
    });
  }
}
