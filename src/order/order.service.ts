import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {OrderDto} from "./dto/order.dto";
import {returnProductObject} from "../product/return-product.object";
import {returnUserPartialObject} from "../user/return-user.object";
import {UpdateOrderStatusDto} from "./dto/update-order-status.dto";
import {EnumOrderStatus} from "@prisma/client";

@Injectable()
export class OrderService {
  constructor(
    private prismaService: PrismaService
  ) {}

  async placeOrder(orderDto: OrderDto, userId: number) {
    const total = orderDto.orderItems.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)

    const order = await this.prismaService.order.create({
      data: {
        status: orderDto.status,
        totalAmount: total,
        orderItems: {
          create: orderDto.orderItems
        },
        user: { connect: { id: userId } }
      }
    })
    return order
  }

  async getAllOrders() {
    return this.prismaService.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {select: returnUserPartialObject},
        orderItems: {include: {product: {select: returnProductObject}}}
      }
    })
  }

  async getOrderDetail(orderId: number) {
    const order = await this.prismaService.order.findUnique({
      where: {id: orderId},
      include: {
        user: {select: returnUserPartialObject},
        orderItems: {include: {product: {select: returnProductObject}}}
      }
    })
    if (!order) {
      throw new NotFoundException('Order not found!')
    }
    return order
  }

  async getAllUserOrders(userId: number) {
    return this.prismaService.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {select: returnUserPartialObject},
        orderItems: {include: {product: {select: returnProductObject}}}
      }
    })
  }

  async getUserOrderDetail(userId: number, orderId: number) {
    const order = await this.prismaService.order.findUnique({
      where: {id: orderId},
      include: {
        user: {select: returnUserPartialObject},
        orderItems: {include: {product: {select: returnProductObject}}}
      }
    })
    if (!order || order.userId !== userId) {
      throw new NotFoundException('Order not found!')
    }
    return order
  }

  async updateOrderStatus(orderId: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    await this.getOrderDetail(orderId)
    return await this.prismaService.order.update({
      where: {id: orderId},
      data: {status: updateOrderStatusDto.status}
    })
  }

  async cancelOrder(userId: number, orderId: number) {
    const order = await this.getUserOrderDetail(userId, orderId)
    if (order.status === EnumOrderStatus.PENDING) {
      return await this.prismaService.order.update({
        where: {id: orderId},
        data: {status: EnumOrderStatus.CANCELLED}
      })
    }
    throw new BadRequestException('The order cannot be canceled because the order has already been shipped, delivered to the customer or canceled!')
  }

  async deleteOrder(orderId: number) {
    return await this.prismaService.order.delete({where: {id: orderId}})
  }
}
