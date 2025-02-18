import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "../../entities/user.entity";
import { Product } from "src/product/entities/product.entity";

@Entity()
@Unique(['user', 'product'])
export class Cart {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'uuid'
  })
  user_id: string

  @Column({
    type: 'uuid'
  })
  product_id: string

  @Column()
  quantity: number
  

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  created_at: Date;
  
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  updated_at: Date;


  @ManyToOne(() => User, user => user.guid)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'guid'
  })
  user: User

  @ManyToOne(() => Product, Product => Product.cartItems)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'guid'
  })
  product: Product

}