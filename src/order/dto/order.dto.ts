import { EnumOrderStatus } from "@prisma/client";
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  ValidateNested
} from "class-validator";
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class OrderDto {
  @IsOptional()
  @IsEnum(EnumOrderStatus)
  @ApiProperty({
    description: 'Order status',
    example: EnumOrderStatus.PENDING,
  })
  status: EnumOrderStatus

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[]
}

export class OrderItemDto {
  @IsNumber()
  @ApiProperty({
    description: 'Product quantity',
    example: 3,
  })
  quantity: number

  @IsNumber()
  @ApiProperty({
    description: 'Product price',
    example: 375,
  })
  price: number

  @IsNumber()
  @ApiProperty({
    description: 'Product id',
    example: 10,
  })
  productId: number
}