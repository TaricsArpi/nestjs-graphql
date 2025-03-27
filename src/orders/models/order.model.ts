import { Field, ID, ObjectType, Float } from '@nestjs/graphql';
import { Product } from 'src/products/models/product.model';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  totalAmount: number;

  @Field(() => Date)
  orderedAt: Date;

  @Field(() => [Product], { nullable: true })
  products?: Product[]

  @Field(() => User, { nullable: true })
  user?: User
}