import { Column, Entity, OneToMany } from 'typeorm';
import { UserRoles } from './userRole.entity';
import { Order } from '../order/entities/order.entity';
import { UserAddress } from '../address/entities/userAddress.entity';
import { UserTodos } from '../../todos/entities/userTodos.entity';
import { Todos } from 'src/todos/entities/todo.entity';

@Entity('users')
export class User {
  @Column('uuid', { unique: true, primary: true })
  guid: string;

  @Column({
    length: 200,
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  first_name: string;

  @Column({
    nullable: true,
  })
  last_name: string;

  @Column({
    type: 'bigint',
    nullable: true,
  })
  mobile: number;

  @Column({
    length: 300,
  })
  password: string;

  @Column({
    unique: true,
  })
  username: string;

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

  @OneToMany(() => UserRoles, (role) => role.user)
  roles: UserRoles[];

  @OneToMany(() => Order, (order) => order.user)
  userOrders: Order[];

  @OneToMany(() => UserTodos, (todo) => todo.user)
  todos: UserTodos[];

  @OneToMany(() => UserAddress, (address) => address.user)
  userAddress: UserAddress[];
}
