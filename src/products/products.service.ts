import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import mapQueryToFindOptions from '@utils/map-query-to-find-options';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  public async create(createProductDto: CreateProductDto) {
    return this.productsRepository.save(createProductDto);
  }

  public async findAll(query: FindProductDto) {
    const findOptions = mapQueryToFindOptions(query);

    const [data, total] =
      await this.productsRepository.findAndCount(findOptions);

    return {
      $limit: findOptions.take,
      $skip: findOptions.skip,
      total,
      data,
    };
  }

  public async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new UnprocessableEntityException('Product is not found');
    }

    return product;
  }

  public async findOneBySlugAndSKU(input: string) {
    const lastHyphenIndex = input.lastIndexOf('-');
    const slug = input.substring(0, lastHyphenIndex);
    const sku = input.substring(lastHyphenIndex + 1);
    const product = await this.productsRepository.findOne({
      where: { slug, sku },
      relations: ['photos.upload'],
    });

    if (!product) {
      throw new UnprocessableEntityException('Product is not found');
    }

    return product;
  }

  public async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new UnprocessableEntityException('Product is not found');
    }

    const updatedProduct = await this.productsRepository.save({
      id,
      ...updateProductDto,
    });

    return updatedProduct;
  }

  public async remove(id: number) {
    const product = await this.findOne(id);

    await this.productsRepository.save({
      id,
      isDeleted: true,
    });

    return product;
  }
}
