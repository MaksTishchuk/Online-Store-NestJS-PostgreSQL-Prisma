import { EnumOrderStatus, Order} from '@prisma/client';
import {ApiProperty} from '@nestjs/swagger';

export class OrderEntity implements Order {

  @ApiProperty()
  id: number

  @ApiProperty()
  status: EnumOrderStatus

  @ApiProperty()
  totalAmount: number

  @ApiProperty()
  userId: number

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}