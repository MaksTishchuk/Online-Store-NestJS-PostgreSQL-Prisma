import { Product } from '@prisma/client'
import {ApiProperty} from "@nestjs/swagger";

export class ProductEntity implements Product {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    slug: string

    @ApiProperty()
    description: string

    @ApiProperty()
    price: number

    @ApiProperty()
    images: string[]

    @ApiProperty()
    categoryId: number

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt: Date
}