import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enums/role.enum';
import { Public } from 'src/decorator/public.decorator';
import { CreateProductDTO } from './dto/create-product.dto';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { AddToCartDTO, UpdateCartDTO } from './dto/carts.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Public()
  async getProduct() {
    const data = await this.productService.getProduct();
    return {
      status: 1,
      message: 'Product fetched',
      data,
    };
  }

  @Post()
  @Roles(Role.Admin)
  async addProduct(@Body() body: CreateProductDTO) {
    const response = await this.productService.addProduct(body);
    return {
      status: 1,
      message: 'Product added',
      data: response,
    };
  }

  @Post('add-to-cart')
  async addToCart(@Body() body: AddToCartDTO) {
    const response = await this.productService.addToCart(body);
    return {
      status: 1,
      message: 'Product added',
      data: response,
    };
  }

  @Patch('update-cart/:productId')
  async updateCart(
    @Body() body: UpdateCartDTO,
    @Param('productId') productId: string,
  ) {
    const response = await this.productService.updateCart(body, productId);
    return {
      status: 1,
      message: 'cart update',
      data: response,
    };
  }

  @Get('category')
  async getCategory() {
    const data = await this.productService.getCategory();
    return {
      status: 1,
      message: 'All Categories',
      data,
    };
  }

  @Post('category/create')
  @Roles(Role.Admin, Role.SuperAdmin)
  async createCategory(@Body() body: CreateCategoryDTO) {
    const response = await this.productService.createCategory(body.category);
    return {
      status: 1,
      message: 'Category Created',
      data: response,
    };
  }
}
