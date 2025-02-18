import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../cart/entities/cart.entity';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { IRequest } from 'src/app.interface';
import { Order } from './entities/order.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,

    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @Inject(REQUEST)
    private request: IRequest,
  ) {}
  async create(properties) {
    // fetch all product from cart for current user
    const cartItems = await this.cartRepo.find({
      where: {
        user_id: this.request.user.guid,
      },
    });

    if (cartItems && !cartItems.length) {
      throw new HttpException('Cart is empty', HttpStatus.BAD_REQUEST);
    }

    const { billAddressId, shippingAddressId } = properties;

    const orderId = uuidv4();

    const order = new Order();

    const orderDetails: any = cartItems.map((item) => {
      return {
        product_id: item.product_id,
        order_id: orderId,
      };
    });

    order.billing_address_id = billAddressId;
    order.shipping_address_id = shippingAddressId;
    order.created_by = this.request.user.guid;
    order.orderDetails = orderDetails;
    order.orderHistory = [{ order_id: orderId, status_id: 1 } as any];
    order.user_id = this.request.user.guid

    this.orderRepo.save(order)
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
