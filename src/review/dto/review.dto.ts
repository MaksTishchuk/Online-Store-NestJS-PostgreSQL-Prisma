import {IsNumber, IsString, Max, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ReviewDto {

  @ApiProperty({
    description: 'Product rating for reviews from 1 to 5',
    example: 4,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number

  @ApiProperty({
    description: 'Review text',
    example: 'This is the best product ever',
  })
  @IsString()
  text: string
}