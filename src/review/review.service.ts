import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {ReviewDto} from "./dto/review.dto";
import {returnReviewObject} from "./return-review.object";
import {ProductService} from "../product/product.service";

@Injectable()
export class ReviewService {
  constructor(
    private prismaService: PrismaService,
    private productService: ProductService
  ) {}

  async createReview(userId: number, reviewDto: ReviewDto, productId: number) {
    await this.productService.getProduct(productId)
    return await this.prismaService.review.create({
      data: {
        rating: reviewDto.rating,
        text: reviewDto.text,
        product: {
          connect: {id: productId}
        },
        user: {
          connect: {id: userId}
        }
      }
    })
  }

  async getReviews() {
    return await this.prismaService.review.findMany({
      orderBy: {createdAt: 'desc'},
      select: returnReviewObject
    })
  }

  async getReview(id: number) {
    const review = await this.prismaService.review.findUnique({
      where: {id: id},
      select: returnReviewObject,
    })
    if (!review) throw new NotFoundException('Review not found!')
    return review
  }

  async getAverageValueByProductId(productId: number) {
    return this.prismaService.review.aggregate({
      where: { productId },
      _avg: { rating: true }
    }).then(data => data._avg)
  }

  async updateReview(id: number, reviewDto: ReviewDto) {
    await this.getReview(id)
    return await this.prismaService.review.update({
      where: {id: id},
      data: {
        rating: reviewDto.rating,
        text: reviewDto.text
      }
    })
  }

  async deleteReview(id: number) {
    await this.getReview(id)
    return await this.prismaService.review.delete({where: {id}})
  }
}
