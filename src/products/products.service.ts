import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async createProduct(input: CreateProductInput) {
    return this.prisma.product.create({
      data: {
        name: input.name,
        description: input.description,
        price: input.price,
        isAvailable: true,
        createdAt: new Date(),
      },
    });
  }

  // If you need to seed some initial data, you could add a method like this:
  async seedInitialProducts() {
    // Only seed if no products exist
    const count = await this.prisma.product.count();
    if (count === 0) {
      await this.prisma.product.createMany({
        data: [
          {
            name: 'Laptop',
            description: 'High performance laptop',
            price: 1299.99,
            isAvailable: true,
            createdAt: new Date(),
          },
          {
            name: 'Smartphone',
            description: 'Latest model with great camera',
            price: 899.99,
            isAvailable: true,
            createdAt: new Date(),
          },
        ],
      });
    }
  }
}