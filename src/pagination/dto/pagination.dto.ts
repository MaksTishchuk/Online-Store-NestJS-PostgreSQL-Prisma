import {IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PaginationDto {

  @ApiProperty({
    description: 'Page number',
    example: '2',
  })
  @IsOptional()
  @IsString()
  page?: string

  @ApiProperty({
    description: 'Product quantity per page',
    example: '5',
  })
  @IsOptional()
  @IsString()
  perPage?: string
}