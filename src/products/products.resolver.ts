import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './models/product.model';
import { CreateProductInput } from './dto/create-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product, { nullable: true })
  async product(@Args('id') id: string): Promise<Product | null> {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  async createProduct(@Args('createProductInput') createProductInput: CreateProductInput): Promise<Product> {
    return this.productsService.createProduct(createProductInput);
  }
}