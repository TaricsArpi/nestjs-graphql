import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => Date)
  createdAt: Date;
  
  // This is a field we won't store but will use for federation later
  @Field(() => [String], { nullable: true })
  orderIds?: string[];
}