import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { OrderStatusMaster } from './orderStatusMaster.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('order_history')
export class OrderHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    primary: true
  })
  order_id: string;

  @Column()
  status_id: number

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  created_at: Date;
  
  @Column({
    nullable: false,
  })
  created_by: string;


  @ManyToOne(() => Order, (order) => order.orderHistory)
  @JoinColumn({name: 'order_id',referencedColumnName: 'guid'})
  order: Order

  @ManyToOne(() => OrderStatusMaster, (statusMaster) => statusMaster.orderHistory)
  @JoinColumn({name: 'status_id'})
  status: OrderStatusMaster

  @ManyToOne(() => User,user => user.guid)
  @JoinColumn({name: 'created_by'})
  createdBy: User

}
