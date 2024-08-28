import { Product } from '@prisma/client';

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  private async validate(data: Product) {
    console.log('validate', data);

    if (!data.price) {
      throw new NotFoundException('El campo "Precio" es obligatorio', {
        description: `price es un campo obligatorio`,
      });
    }

    if (!data.name) {
      throw new NotFoundException('El campo "Nombre" es obligatorio', {
        description: `name es un campo obligatorio`,
      });
    }

    if (!data.description) {
      throw new NotFoundException('El campo "Descripción" es obligatorio', {
        description: `description es un campo obligatorio`,
      });
    }

    if (!data.image) {
      throw new NotFoundException('Debe seleccionar una imagen', {
        description: `image es un campo obligatorio`,
      });
    }

    if (!data.total) {
      throw new NotFoundException('El campo "Total" es obligatorio', {
        description: `total es un campo obligatorio`,
      });
    }
  }

  async getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async getProductById(id: number): Promise<Product> {
    return this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createProduct(data: Product): Promise<Product> {
    await this.validate(data);

    return this.prisma.product.create({
      data,
    });
  }

  async updateProduct(id: number, data: Product): Promise<Product> {
    return this.prisma.product.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
}
