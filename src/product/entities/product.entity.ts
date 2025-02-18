import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { ProductImages } from './product-images.entity';
import { Cart } from 'src/users/cart/entities/cart.entity';
import { Order } from 'src/users/order/entities/order.entity';

@Entity()
export class Product {

  @Column({
    type: 'uuid',
    unique: true,
    primary: true
  })
  guid: string

  @Column({length: 100})
  name: string

  @Column({length: 500})
  description: string

  @Column({
    type: 'uuid'
  })
  artist_id: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    select: false,
  })
  artist_price: number
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  price: number

  @ManyToOne(() => User, user => user.guid)
  @JoinColumn({ name: 'artist_id', referencedColumnName: 'guid' })
  artist: User;

  @ManyToMany(() => Category, category => category.products)
  @JoinTable({
    name: 'product_categories',
    joinColumn: {
      name: 'product_guid',
      referencedColumnName: 'guid',
      foreignKeyConstraintName: 'FK_product_guid'
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id'
    }
  })
  categories: Category[];

  @OneToMany(() => ProductImages, productImage => productImage.product)
  productImages: ProductImages[];

  @OneToMany(() => Cart, cart => cart.product)
  cartItems: Cart[]

  @ManyToMany(() => Order,(order) => order.orderDetails)
  orders: Order[]
}
