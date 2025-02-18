import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAddress } from './userAddress.entity';

@Entity('addresses')
export class Addresses {
  @Column({
    primary: true,
  })
  guid: string;

  @Column()
  line_no_1: string;

  @Column({ nullable: true })
  line_no_2: string;

  @Column()
  landmark: string;

  @Column()
  state_id: number;

  @Column()
  city: string;

  @Column()
  pincode: number;

  @Column({
    type: 'bigint',
  })
  phone_number: number;

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

  @OneToMany(() => UserAddress,address => address.addresses)
  userAddress: UserAddress[]
}
