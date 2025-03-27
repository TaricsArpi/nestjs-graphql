import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './models/order.model';
import { CreateOrderInput } from './dto/create-order.input';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private ordersService: OrdersService) {}

  @Query(() => [Order])
  async orders(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Query(() => Order, { nullable: true })
  async order(@Args('id') id: string): Promise<Order | null> {
    return this.ordersService.findOne(id);
  }

  @Query(() => [Order])
  async ordersByUser(@Args('userId') userId: string): Promise<Order[]> {
    return this.ordersService.findByUser(userId);
  }

  @Mutation(() => Order)
  async createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput): Promise<Order> {
    return this.ordersService.createOrder(createOrderInput);
  }
}