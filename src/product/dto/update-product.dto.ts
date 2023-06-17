import {ArrayMinSize, IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {ApiModelPropertyOptional} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class UpdateProductDto {

  @ApiProperty({
    description: 'Product name',
    example: 'Ball',
  })
  @IsOptional()
  @IsString()
  name: string

  @ApiProperty({
    description: 'Product price',
    example: 323,
  })
  @IsOptional()
  @IsNumber()
  price: number

  @ApiProperty({
    description: 'Product description',
    example: 'Its a ball for football',
  })
  @IsOptional()
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
  @IsOptional()
  @IsNumber()
  categoryId: number
}