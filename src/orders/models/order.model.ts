import { Field, ID, ObjectType, Float } from '@nestjs/graphql';

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field(() => [String])
  productIds: string[];

  @Field(() => Float)
  totalAmount: number;

  @Field(() => Date)
  orderedAt: Date;
}