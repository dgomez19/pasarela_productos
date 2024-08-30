import {
  Controller,
  Get,
  Param,
  BadRequestException,
  Post,
  Put,
  Delete,
  Body,
  Injectable,
} from '@nestjs/common';

import { ProductsService } from './products.service';

import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const productFound = await this.productsService.getProductById(Number(id));
    if (!productFound) throw new BadRequestException('Product does not exist');
    return productFound;
  }

  @Post()
  async createProduct(@Body() data: Product) {
    return this.productsService.createProduct(data);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() data: Product) {
    try {
      return await this.productsService.updateProduct(Number(id), data);
    } catch (error) {
      throw new BadRequestException('Product does not exist');
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      return await this.productsService.deleteProduct(Number(id));
    } catch (error) {
      throw new BadRequestException('Product does not exist');
    }
  }
}
