import {ArrayMinSize, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateProductDto {

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsNumber()
  price: number

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsString({each: true})
  @ArrayMinSize(1)
  images: string[]

  @IsOptional()
  @IsNumber()
  categoryId: number
}