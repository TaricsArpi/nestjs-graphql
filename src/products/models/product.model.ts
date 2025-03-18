import { Field, ID, ObjectType, Float } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field(() => Boolean, { defaultValue: true })
  isAvailable: boolean;

  @Field(() => Date)
  createdAt: Date;
}