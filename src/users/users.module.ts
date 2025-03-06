import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart/entities/cart.entity';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { OrderModule } from './order/order.module';
import { AddressModule } from './address/address.module';
import { UserRoles } from './entities/userRole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Cart,UserRoles]), OrderModule, AddressModule],
  controllers: [UsersController, CartController],
  providers: [UsersService, CartService]
})
export class UsersModule {}
