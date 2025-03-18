import { Injectable } from '@nestjs/common';
import { Product } from './models/product.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  // In-memory database for this example
  private products: Product[] = [];

  constructor() {
    // Add some sample products
    this.createProduct({
      name: 'Laptop',
      description: 'High performance laptop',
      price: 1299.99,
    });
    this.createProduct({
      name: 'Smartphone',
      description: 'Latest model with great camera',
      price: 899.99,
    });
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string): Product | null {
    return this.products.find(product => product.id === id) || null;
  }

  createProduct(input: { name: string; description?: string; price: number }): Product {
    const product: Product = {
      id: uuidv4(),
      name: input.name,
      description: input.description,
      price: input.price,
      isAvailable: true,
      createdAt: new Date(),
    };

    this.products.push(product);
    return product;
  }
}