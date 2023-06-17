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
import {CategoryService} from "../category/category.service";

@Injectable()
export class ProductService {

  constructor(
    private prismaService: PrismaService,
    private paginationService: PaginationService,
    private categoryService: CategoryService
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
    const {perPage, skip} = this.paginationService.getPagination(filtersProductsDto)
    const filters = this.createFilter(filtersProductsDto)

    const products = await this.prismaService.product.findMany({
      where: filters,
      select: returnProductObject,
      orderBy: this.getSortOption(filtersProductsDto.sort),
      skip,
      take: perPage
    })
    const count = await this.prismaService.product.count({where: filters})
    return {count, products}
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
      if (categoryId) await this.categoryService.getCategory(categoryId)
      return await this.prismaService.product.update({
        where: {id: id},
        data: {
          name: name ? name : product.name,
          slug: name ?  generateSlug(name) : product.slug,
          price: price ? price : product.price,
          description: description ? description : product.description,
          images: images ? images : product.images,
          categoryId: categoryId ? categoryId : product.categoryId
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
    await this.getProduct(id)
    return await this.prismaService.product.delete({where: {id}})
  }


  private createFilter(dto: FiltersProductsDto): Prisma.ProductWhereInput {
    const filters: Prisma.ProductWhereInput[] = []
    if (dto.search) filters.push(this.getSearchFilter(dto.search))
    if (dto.ratings) {
      filters.push(this.getRatingFilter(dto.ratings.split('|').map(rating => +rating)))
    }
    if (dto.minPrice || dto.maxPrice) {
      filters.push(this.getPriceFilter(this.convertToNumber(dto.minPrice), this.convertToNumber(dto.maxPrice)))
    }
    if (dto.categoryId) filters.push(this.getCategoryFilter(+dto.categoryId))
    return filters.length ? {AND: filters} : {}
  }

  private getSortOption(sort: EnumProductsSort): Prisma.ProductOrderByWithRelationInput[] {
    switch (sort) {
      case EnumProductsSort.LOW_PRICE:
        return [{price: 'asc'}]
      case EnumProductsSort.HIGH_PRICE:
        return [{price: 'desc'}]
      case EnumProductsSort.OLDEST:
        return [{createdAt: 'asc'}]
      default:
        return [{createdAt: 'desc'}]
    }
  }

  private getSearchFilter(search: string): Prisma.ProductWhereInput {
    return {
      OR: [
        {category: {name: {contains: search, mode: 'insensitive'}}},
        {name: {contains: search, mode: 'insensitive'}},
        {description: {contains: search, mode: 'insensitive'}}
      ]
    }
  }

  private getRatingFilter(ratings: number[]): Prisma.ProductWhereInput {
    return {
      reviews: {
        some: {
          rating: {
            in: ratings
          }
        }
      }
    }
  }

  private getPriceFilter(minPrice?: number, maxPrice?: number): Prisma.ProductWhereInput {
    let priceFilter: Prisma.IntFilter | undefined = undefined
    if (minPrice) {
      priceFilter = {
        ...priceFilter, gte: minPrice
      }
    }
    if (maxPrice) {
      priceFilter = {
        ...priceFilter, lte: maxPrice
      }
    }
    return {price: priceFilter}
  }

  private getCategoryFilter(categoryId: number): Prisma.ProductWhereInput {
    return {categoryId}
  }

  private convertToNumber(input: string): number | undefined {
    const number = +input
    return isNaN(number) ? undefined : number
  }
}
