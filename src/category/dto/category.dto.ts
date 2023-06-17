import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CategoryDto {
  @IsString()
  @ApiProperty({
    description: 'Category name',
    example: 'Sport',
  })
  name: string
}