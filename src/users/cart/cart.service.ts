import { Inject, Injectable } from '@nestjs/common';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { IRequest } from 'src/app.interface';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,

    @Inject(REQUEST)
    private request: IRequest,
  ) {}
  async getCart() {
    const userCart = await this.cartRepo.find({
      where: {
        user_id: this.request.user.guid,
      },
      relations: ['product', 'product.artist','product.productImages'],
      select: {
        quantity: true,
        created_at: true,
        product: {
          name: true,
          description: true,
          price: true,
          artist: {
            first_name: true,
            last_name: true,
            username: true,
          },
          productImages: {
            url: true
          }
        },
      },
    });
    let cartTotal: number = 0;
    const items = userCart.map((cart) => {
      const total = cart.product.price * cart.quantity;
      cartTotal += total;
      return {
        ...cart,
        total,
      };
    });
    return {
      items,
      total: cartTotal
    };
  }
}
