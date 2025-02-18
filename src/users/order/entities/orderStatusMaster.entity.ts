import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { OrderHistory } from './orderHistory.entity';

@Entity('order_status_master')
export class OrderStatusMaster {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  status: string;

  @OneToMany(() => Order, (order) => order.currentStatus)
  currentOrderStatus: Order[]

  @OneToMany(() => OrderHistory, (oh) => oh.status)
  orderHistory: OrderHistory[]
}
