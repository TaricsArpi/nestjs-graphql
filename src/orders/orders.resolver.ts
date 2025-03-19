import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './models/order.model';
import { CreateOrderInput } from './dto/create-order.input';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private ordersService: OrdersService) {}

  @Query(() => [Order])
  orders(): Order[] {
    return this.ordersService.findAll();
  }

  @Query(() => Order, { nullable: true })
  order(@Args('id') id: string): Order | null {
    return this.ordersService.findOne(id);
  }

  @Query(() => [Order])
  ordersByUser(@Args('userId') userId: string): Order[] {
    return this.ordersService.findByUser(userId);
  }

  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput): Order {
    return this.ordersService.createOrder(createOrderInput);
  }
}