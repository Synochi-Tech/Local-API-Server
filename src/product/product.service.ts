import { Inject, Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { IRequest } from 'src/app.interface';
import { ProductImages } from './entities/product-images.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { Cart } from 'src/users/cart/entities/cart.entity';
import { AddToCartDTO, UpdateCartDTO } from './dto/carts.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,

    @InjectRepository(ProductImages)
    private productImagesRepo: Repository<ProductImages>,

    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,

    @Inject(REQUEST)
    private request: IRequest,
  ) {}
  async getProduct() {
    return await this.productRepo.find({
      relations: ['categories', 'productImages', 'artist'],
      select: {
        guid: true,
        name: true,
        description: true,
        artist_id: true,
        price: true,
        categories: {
          id: true,
          category: true,
        },
        artist: {
          guid: true,
          username: true,
        },
        productImages: {
          url: true,
        },
      },
    });
  }

  async addProduct(body: CreateProductDTO) {
    const { name, description, categoryIds, price, images } = body;

    // Create a new product instance
    const product = new Product();
    product.guid = uuidv4();
    product.name = name;
    product.description = description;
    product.artist_price = price;
    product.price = price + price * 0.1;
    product.artist_id = this.request.user.guid;

    // Handle categories
    product.categories = await this.categoryRepo.findBy({
      id: In(categoryIds),
    });

    // Save the product first to generate the ID
    const savedProduct = await this.productRepo.save(product);

    // Handle product images
    for (const imageUrl of images) {
      const productImage = new ProductImages();
      productImage.product_guid = savedProduct.guid;
      productImage.url = imageUrl;
      await this.productImagesRepo.save(productImage);
    }

    // Optionally reload the product with relations
    return await this.productRepo.findOne({
      where: { guid: savedProduct.guid },
      relations: ['categories', 'productImages'],
      select: {
        categories: {
          id: true,
          category: true,
        },
      },
    });
  }

  async createCategory(categories: string[]) {
    this.request;
    const categoryInsertData = categories.map((category) => {
      return this.categoryRepo.create({
        category,
        created_by: this.request.user.guid,
      });
    });
    return await this.categoryRepo.save(categoryInsertData, { chunk: 10 });
  }

  async getCategory() {
    return this.categoryRepo.find();
  }

  async addToCart(body: AddToCartDTO) {
    const cart = new Cart();

    cart.product_id = body.productId;
    (cart.user_id = this.request.user.guid), (cart.quantity = body.quantity);

    await this.cartRepo.save(cart);
  }

  async updateCart(body: UpdateCartDTO, productId) {
    const cart = new Cart();
    cart.quantity = body.quantity;

    await this.cartRepo.update(
      {
        product_id: productId,
      },
      cart,
    );
  }
}
