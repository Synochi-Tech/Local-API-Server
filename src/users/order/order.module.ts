import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderHistory } from './entities/orderHistory.entity';
import { OrderStatusMaster } from './entities/orderStatusMaster.entity';
import { Cart } from '../cart/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order,OrderHistory,OrderStatusMaster,Cart]),],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
