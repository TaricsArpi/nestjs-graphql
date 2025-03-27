import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        orders: true, // Optional: include user's orders
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        orders: true, // Optional: include user's orders
      },
    });
  }

  async createUser(input: { name: string; email: string }) {
    try {
      return await this.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
        include: {
          orders: true, // Optional: include user's orders
        },
      });
    } catch (error) {
      // Handle unique constraint violation (duplicate email)
      if (error.code === 'P2002') {
        // Prisma error code for unique constraint violation
        const existingUser = await this.findByEmail(input.email);
        if (existingUser) {
          return existingUser;
        }
        throw new ConflictException('User creation failed');
      }
      throw error;
    }
  }

  // Optional: Method to seed initial users
  async seedInitialUsers() {
    const count = await this.prisma.user.count();
    if (count === 0) {
      await this.prisma.user.createMany({
        data: [
          {
            name: 'John Doe',
            email: 'john@example.com',
          },
          {
            name: 'Jane Smith',
            email: 'jane@example.com',
          },
        ],
      });
    }
  }
}