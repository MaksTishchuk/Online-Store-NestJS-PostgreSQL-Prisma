import {ArrayMinSize, IsNumber, IsOptional, IsString, Max, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {ApiModelPropertyOptional} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class CreateProductDto {

  @ApiProperty({
    description: 'Product name',
    example: 'Ball',
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Product price',
    example: 323,
  })
  @IsNumber()
  price: number

  @ApiProperty({
    description: 'Product description',
    example: 'Its a ball for football',
  })
  @IsString()
  description: string

  @ApiModelPropertyOptional({ type: ['string'], format: 'binary' })
  @IsOptional()
  @IsString({each: true})
  @ArrayMinSize(1)
  images: string[]

  @ApiProperty({
    description: 'Category id',
    example: 2,
  })
  @IsNumber()
  categoryId: number
}