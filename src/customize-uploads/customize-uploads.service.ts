import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCustomizeUploadDto } from './dto/create-customize-upload.dto';
import { CustomizeUpload } from './entities/customize-upload.entity';
import { CustomizePrint } from './entities/customize-print.entity';

@Injectable()
export class CustomizeUploadsService {
  constructor(
    @InjectRepository(CustomizeUpload)
    private customizeUploadsRepository: Repository<CustomizeUpload>,
    @InjectRepository(CustomizePrint)
    private customizePrintsRepository: Repository<CustomizePrint>,
  ) {}

  public async create(createCustomizeUploadDto: CreateCustomizeUploadDto) {
    return this.customizeUploadsRepository.save({
      ...createCustomizeUploadDto,
    });
  }

  public async createPrint(createCustomizeUploadDto: CreateCustomizeUploadDto) {
    return this.customizePrintsRepository.save({
      ...createCustomizeUploadDto,
    });
  }

  public async findOne(id: number) {
    const customizeUpload = await this.customizeUploadsRepository.findOne({
      where: { id },
    });

    if (!customizeUpload) {
      throw new UnprocessableEntityException('Customize Upload is not found');
    }

    return customizeUpload;
  }

  public async remove(id: number) {
    const customizeUpload = await this.findOne(id);

    await this.customizeUploadsRepository.delete(id);

    return customizeUpload;
  }
}
