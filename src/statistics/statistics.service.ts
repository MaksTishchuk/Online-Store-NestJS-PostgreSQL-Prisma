import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {UserService} from "../user/user.service";

@Injectable()
export class StatisticsService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService
  ) {}

  async getMain(userId: number) {
    const user = await this.userService.getUser(userId, {
      orders: {
        select: {
          orderItems: true
        }
      },
      reviews: true
    })

    return [
      {
        name: 'Orders',
        value: user.orders.length
      },
      {
        name: 'Reviews',
        value: user.reviews.length
      },
    ]
  }
}
