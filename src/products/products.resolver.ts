import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './models/product.model';
import { CreateProductInput } from './dto/create-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  products(): Product[] {
    return this.productsService.findAll();
  }

  @Query(() => Product, { nullable: true })
  product(@Args('id') id: string): Product | null {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput): Product {
    return this.productsService.createProduct(createProductInput);
  }
}