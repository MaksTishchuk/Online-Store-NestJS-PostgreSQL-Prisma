import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {generateSlug} from "../utils/generate-slug";
import {CreateProductDto} from "./dto/create-product.dto";
import {returnProductObject, returnProductObjectFullest} from "./return-product.object";
import {EnumProductsSort, FiltersProductsDto} from "./dto/filters-products.dto";
import {PaginationService} from "../pagination/pagination.service";
import {Prisma} from "@prisma/client";
import {UpdateProductDto} from "./dto/update-product.dto";

@Injectable()
export class ProductService {

  constructor(
    private prismaService: PrismaService,
    private paginationService: PaginationService
  ) {}

  async createProduct(productDto: CreateProductDto) {
    try {
      const {name, price, description, images, categoryId} = productDto
      return await this.prismaService.product.create({
        data: {
          name: name,
          slug: generateSlug(name),
          price: price,
          description: description,
          images: images,
          category: {connect: {id: categoryId}}
        }
      })
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Product with this name already exists!')
      } else if (error.code === 'P2025') {
        throw new BadRequestException(`Category with id ${productDto.categoryId} not found!`)
      }
      throw new InternalServerErrorException(`Something went wrong! ${error.message}`)
    }
  }

  async getProducts(filtersProductsDto: FiltersProductsDto = {}) {
    const {sort, search} = filtersProductsDto

    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []
    if (sort === EnumProductsSort.LOW_PRICE) {
      prismaSort.push({price: 'asc'})
    } else if (sort === EnumProductsSort.HIGH_PRICE) {
      prismaSort.push({price: 'desc'})
    } else if (sort === EnumProductsSort.OLDEST) {
      prismaSort.push({createdAt: 'asc'})
    } else {
      prismaSort.push({createdAt: 'desc'})
    }

    const prismaSearchFilter: Prisma.ProductWhereInput = search ? {
      OR: [
        {category: {name: {contains: search, mode: 'insensitive'}}},
        {name: {contains: search, mode: 'insensitive'}},
        {description: {contains: search, mode: 'insensitive'}}
      ]
    }: {}

    const {perPage, skip} = this.paginationService.getPagination(filtersProductsDto)

    const products = await this.prismaService.product.findMany({
      where: prismaSearchFilter,
      select: returnProductObject,
      orderBy: prismaSort,
      skip,
      take: perPage
    })
    const counts = await this.prismaService.product.count({where: prismaSearchFilter})
    return {counts, products}
  }

  async getProduct(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: {id: id},
      select: returnProductObjectFullest,
    })
    if (!product) throw new NotFoundException('Product not found!')
    return product
  }

  async getProductBySlug(slug: string) {
    const product = await this.prismaService.product.findUnique({
      where: {slug: slug},
      select: returnProductObjectFullest,
    })
    if (!product) throw new NotFoundException('Product not found!')
    return product
  }

  async getProductsByCategorySlug(categorySlug: string) {
    const products = await this.prismaService.product.findMany({
      where: {
        category: { slug: categorySlug }
      },
      select: returnProductObject,
    })
    if (!products) throw new NotFoundException('Products not found!')
    return products
  }

  async getSimilarProducts(id: number) {
    const currentProduct = await this.getProduct(id)

    return await this.prismaService.product.findMany({
      where: {
        category: { name: currentProduct.category.name },
        NOT: {id: currentProduct.id}
      },
      orderBy:  { createdAt: 'desc' },
      select: returnProductObjectFullest,
    })
  }

  async updateProduct(id: number, productDto: UpdateProductDto) {
    try {
      const {name, price, description, images, categoryId} = productDto
      const product = await this.getProduct(id)
      return await this.prismaService.product.update({
        where: {id: id},
        data: {
          name: name ?? product.name,
          slug: typeof name !== 'undefined' ?  generateSlug(name) : product.slug,
          price: price ?? product.price,
          description: description ?? product.description,
          images: images ?? product.images,
          categoryId: typeof categoryId !== 'undefined' ? categoryId : product.categoryId
        }
      })
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException(`${error.meta.cause}`)
      }
      throw new InternalServerErrorException(`Something went wrong!`)
    }

  }

  async deleteProduct(id: number) {
    return await this.prismaService.product.delete({where: {id}})
  }
}
