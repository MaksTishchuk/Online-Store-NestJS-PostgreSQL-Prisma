import {ArrayMinSize, IsEnum, IsNumber, IsOptional, IsString, Max, Min} from "class-validator";
import {PaginationDto} from "../../pagination/dto/pagination.dto";
import {ApiProperty} from "@nestjs/swagger";

export enum EnumProductsSort {
  HIGH_PRICE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export class FiltersProductsDto extends PaginationDto{

  @ApiProperty({
    description: 'Sort products by',
    example: EnumProductsSort.HIGH_PRICE,
  })
  @IsOptional()
  @IsEnum(EnumProductsSort)
  sort?: EnumProductsSort

  @ApiProperty({
    description: 'Search term',
    example: 'ball',
  })
  @IsOptional()
  @IsString()
  search?: string

  @ApiProperty({
    description: 'Filter products by rating',
    example: '5|4|3',
  })
  @IsOptional()
  @IsString()
  ratings?: string

  @ApiProperty({
    description: 'Minimal price',
    example: '100',
  })
  @IsOptional()
  @IsString()
  minPrice?: string

  @ApiProperty({
    description: 'Maximum price',
    example: '300',
  })
  @IsOptional()
  @IsString()
  maxPrice?: string

  @ApiProperty({
    description: 'Category id',
    example: '3',
  })
  @IsOptional()
  @IsString()
  categoryId?: string
}