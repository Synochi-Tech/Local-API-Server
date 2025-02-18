import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true
  })
  category: string

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
  
  @Column({
    nullable: true,
    type: 'timestamp'
  })
  updated_by: string;
  
  @Column({
    nullable: false,
  })
  created_by: string;

  @ManyToMany(() => Product, product => product.categories)
  products: Product[];
}