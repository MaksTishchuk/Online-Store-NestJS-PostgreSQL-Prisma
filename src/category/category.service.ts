import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {returnCategoryObject} from "./return-category.object";
import {CategoryDto} from "./dto/category.dto";
import {generateSlug} from "../utils/generate-slug";

@Injectable()
export class CategoryService {

  constructor(
    private prismaService: PrismaService
  ) {}

  async createCategory(categoryDto: CategoryDto) {
    return await this.prismaService.category.create({
      data: {
        name: categoryDto.name,
        slug: generateSlug(categoryDto.name)
      }
    })
  }

  async getCategories() {
    return await this.prismaService.category.findMany({select: returnCategoryObject})
  }

  async getCategory(id: number) {
    const category = await this.prismaService.category.findUnique({
      where: {id: id},
      select: returnCategoryObject,
    })
    if (!category) throw new NotFoundException('Category not found!')
    return category
  }

  async getCategoryBySlug(slug: string) {
    const category = await this.prismaService.category.findUnique({
      where: {slug: slug},
      select: returnCategoryObject,
    })
    if (!category) throw new NotFoundException('Category not found!')
    return category
  }

  async updateCategory(id: number, categoryDto: CategoryDto) {
    return await this.prismaService.category.update({
      where: {id: id},
      data: {
        name: categoryDto.name,
        slug: generateSlug(categoryDto.name)
      }
    })
  }

  async deleteCategory(id: number) {
    return await this.prismaService.category.delete({where: {id}})
  }
}
