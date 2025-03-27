import { Field, ID, ObjectType, Float } from '@nestjs/graphql';
import { Order } from 'src/orders/models/order.model';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => Float)
  price: number;

  @Field(() => Boolean, { defaultValue: true })
  isAvailable: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => [Order], { nullable: true })
  orders?: Order[]
}