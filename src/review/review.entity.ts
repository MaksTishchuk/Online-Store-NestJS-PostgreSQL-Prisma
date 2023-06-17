import { Review } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewEntity implements Review {
  @ApiProperty()
  id: number

  @ApiProperty()
  rating: number

  @ApiProperty()
  text: string

  @ApiProperty()
  userId: number

  @ApiProperty()
  productId: number

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}