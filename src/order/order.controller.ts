import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put, UseGuards
} from '@nestjs/common';
import { OrderService } from './order.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {GetUser} from "../auth/decorators/get-user.decorator";
import {OrderDto} from "./dto/order.dto";
import {UpdateOrderStatusDto} from "./dto/update-order-status.dto";
import {AdminRoleGuard} from "../user/guards/admin-role.guard";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(200)
  @Auth()
  placeOrder(
    @Body() orderDto: OrderDto,
    @GetUser('id') userId: number
  ) {
    return this.orderService.placeOrder(orderDto, userId)
  }

  @Get('')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  getAllOrders() {
    return this.orderService.getAllOrders()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  getOrderDetail(
    @Param('id', ParseIntPipe) orderId: number
  ) {
    return this.orderService.getOrderDetail(orderId)
  }

  @Get('user-orders')
  @Auth()
  getAllUserOrders(@GetUser('id') userId: number) {
    return this.orderService.getAllUserOrders(userId)
  }

  @Get('user-orders/:id')
  @Auth()
  getUserOrderDetail(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) orderId: number
  ) {
    return this.orderService.getUserOrderDetail(userId, orderId)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  updateOrderStatus(
    @Param('id', ParseIntPipe) orderId: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto
  ) {
    return this.orderService.updateOrderStatus(orderId, updateOrderStatusDto)
  }

  @Put(':id/cancel')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  cancelOrder(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) orderId: number
  ) {
    return this.orderService.cancelOrder(userId, orderId)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  deleteOrder(
    @Param('id', ParseIntPipe) orderId: number
  ) {
    return this.orderService.deleteOrder(orderId)
  }
}
