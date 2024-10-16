// src/variants/dto/create-variant.dto.ts
import {
  IsInt,
  IsArray,
  ValidateNested,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVariantDto {
  @ApiProperty()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a valid number with up to 2 decimal places' },
  )
  price: number;

  @ApiProperty()
  @IsInt()
  stock: number;

  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  uploadId?: number;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantOptionValueDto)
  optionValues: VariantOptionValueDto[];
}

export class VariantOptionValueDto {
  @ApiProperty()
  @IsInt()
  optionId: number;

  @ApiProperty()
  @IsInt()
  valueId: number;
}
