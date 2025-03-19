import { Field, InputType, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsArray, IsString, Min } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  productIds: string[];

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  totalAmount: number;
}