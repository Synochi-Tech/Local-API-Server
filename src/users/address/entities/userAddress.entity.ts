import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Addresses } from './address.entity';

@Entity('user_address')
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({
    type: 'uuid',
    name: 'user_id',
  })
  user_id: string;

  @PrimaryColumn({
    type: 'uuid',
    name: 'address_id',
  })
  address_id: string;

  @Column({
    default: false,
  })
  is_default: boolean;

  @ManyToOne(() => User, (user) => user.userAddress)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'guid'
  })
  user: User;
  
  @ManyToOne(() => Addresses, (addresses) => addresses.userAddress)
  @JoinColumn({
    name: 'address_id',
    referencedColumnName: 'guid'
  })
  addresses: Addresses;
}
