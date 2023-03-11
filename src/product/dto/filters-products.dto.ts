import {ArrayMinSize, IsEnum, IsNumber, IsOptional, IsString, Max, Min} from "class-validator";
import {PaginationDto} from "../../pagination/dto/pagination.dto";

export enum EnumProductsSort {
  HIGH_PRICE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export class FiltersProductsDto extends PaginationDto{

  @IsOptional()
  @IsEnum(EnumProductsSort)
  sort?: EnumProductsSort

  @IsOptional()
  @IsString()
  search?: string
}