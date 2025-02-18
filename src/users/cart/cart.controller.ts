import { Controller, Get } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users/Cart')
@ApiBearerAuth()
@Controller('users/cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @Get()
  async getCart() {
    const data = await this.cartService.getCart();
    return {
      status: 1,
      message: 'cart listing',
      data,
    };
  }
}
