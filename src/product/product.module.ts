import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { ProductImages } from './entities/product-images.entity';
import { Cart } from 'src/users/cart/entities/cart.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product,Category,ProductImages,Cart])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
