import { EnumOrderStatus } from "@prisma/client";
import {IsEnum, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateOrderStatusDto {
  @IsOptional()
  @IsEnum(EnumOrderStatus)
  @ApiProperty({
    description: 'Order status',
    example: EnumOrderStatus.SHIPPED,
  })
  status: EnumOrderStatus
}