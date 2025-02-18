import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductImages {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 500
  })
  url: string

  @Column({
    type: 'uuid'
  })
  product_guid: string
  

  @ManyToOne(() => Product, product => product.productImages)
  @JoinColumn({
    name: 'product_guid',
    referencedColumnName: 'guid'
  })
  product: Product
}