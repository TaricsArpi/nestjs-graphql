import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        products: true,
        user: true
      }
    });
  }
  
  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        products: true,
        user: true
      }
    });
  }
  
  async findByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { user: { id: userId}  },
      include: {
        products: true,
        user: true
      }
    });
  }

  async createOrder(input: { 
    userId: string; 
    productIds: string[]; 
    totalAmount: number 
  }) {
    return this.prisma.order.create({
      data: {
        userId: input.userId,
        totalAmount: input.totalAmount,
        products: {
          connect: input.productIds.map(id => ({ id }))
        },
        orderedAt: new Date()
      },
      include: {
        products: true,
        user: true
      }
    });
  }

  // Optional: Method to seed initial data if needed
  async seedInitialOrders() {
    const count = await this.prisma.order.count();
    if (count === 0) {
      // You might want to ensure you have a user and products first
      const user = await this.prisma.user.findFirst();
      const products = await this.prisma.product.findMany({ take: 2 });

      if (user && products.length > 0) {
        await this.prisma.order.create({
          data: {
            userId: user.id,
            totalAmount: products.reduce((sum, product) => sum + product.price, 0),
            products: {
              connect: products.map(product => ({ id: product.id }))
            },
            orderedAt: new Date()
          }
        });
      }
    }
  }
}