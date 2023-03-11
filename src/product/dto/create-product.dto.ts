import {ArrayMinSize, IsNumber, IsOptional, IsString, Max, Min} from "class-validator";

export class CreateProductDto {

  @IsString()
  name: string

  @IsNumber()
  price: number

  @IsString()
  description: string

  @IsOptional()
  @IsString({each: true})
  @ArrayMinSize(1)
  images: string[]

  @IsNumber()
  categoryId: number
}