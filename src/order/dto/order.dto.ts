import { EnumOrderStatus } from "@prisma/client";
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  ValidateNested
} from "class-validator";
import {Type} from "class-transformer";

export class OrderDto {
  @IsOptional()
  @IsEnum(EnumOrderStatus)
  status: EnumOrderStatus

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[]
}

export class OrderItemDto {
  @IsNumber()
  quantity: number

  @IsNumber()
  price: number

  @IsNumber()
  productId: number
}