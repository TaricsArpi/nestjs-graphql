import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor() {
    // Add some sample users
    this.createUser({
      name: 'John Doe',
      email: 'john@example.com',
    });
    this.createUser({
      name: 'Jane Smith',
      email: 'jane@example.com',
    });
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User | null {
    return this.users.find(user => user.id === id) || null;
  }

  findByEmail(email: string): User | null {
    return this.users.find(user => user.email === email) || null;
  }

  createUser(input: { name: string; email: string }): User {
    const existingUser = this.findByEmail(input.email);
    if (existingUser) {
      return existingUser;
    }

    const user: User = {
      id: uuidv4(),
      name: input.name,
      email: input.email,
      createdAt: new Date(),
    };

    this.users.push(user);
    return user;
  }
}