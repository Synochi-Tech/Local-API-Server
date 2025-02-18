import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { OrderStatusMaster } from './orderStatusMaster.entity';
import { OrderHistory } from './orderHistory.entity';

@Entity('orders')
export class Order {
  @Column({
    type: 'uuid',
    unique: true,
    primary: true,
  })
  guid: string;

  @Column({
    unique: true,
    primary: true,
    nullable: false,
  })
  user_id: string;

  @Column()
  billing_address_id: number;

  @Column()
  shipping_address_id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  updated_at: Date;

  @Column({
    nullable: true,
  })
  updated_by: string;

  @Column({
    nullable: false,
  })
  created_by: string;

  @ManyToOne(() => User, (user) => user.userOrders)
  @JoinColumn({
    referencedColumnName: 'guid',
    name: 'user_id',
    foreignKeyConstraintName: 'FK_user_orders',
  })
  user: User;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable({
    name: 'order_details',
    joinColumn: {
      name: 'order_id',
      referencedColumnName: 'guid',
      foreignKeyConstraintName: 'FK_Order_GUID',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'guid',
    },
  })
  orderDetails: Product[];

  @ManyToOne(() => OrderStatusMaster,(sm) => sm.currentOrderStatus)
  @JoinColumn({name: 'current_order_status_id'})
  currentStatus: OrderStatusMaster

  @OneToMany(() => OrderHistory,(oh) => oh.order)
  orderHistory: OrderHistory[]
}
