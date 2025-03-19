import { Injectable } from '@nestjs/common';
import { Order } from './models/order.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  constructor() {
    // Add some sample orders
    this.createOrder({
      userId: 'user-id-placeholder', // We'll replace this when we implement federation
      productIds: ['product-id-placeholder'],
      totalAmount: 1299.99,
    });
  }

  findAll(): Order[] {
    return this.orders;
  }

  findOne(id: string): Order | null {
    return this.orders.find(order => order.id === id) || null;
  }

  findByUser(userId: string): Order[] {
    return this.orders.filter(order => order.userId === userId);
  }

  createOrder(input: { userId: string; productIds: string[]; totalAmount: number }): Order {
    const order: Order = {
      id: uuidv4(),
      userId: input.userId,
      productIds: input.productIds,
      totalAmount: input.totalAmount,
      orderedAt: new Date(),
    };

    this.orders.push(order);
    return order;
  }
}