import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { ProductsService } from './products/products.service';
import { OrdersService } from './orders/orders.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); 

  // Seed initial data
  const usersService = app.get(UsersService);
  const productsService = app.get(ProductsService);
  const ordersService = app.get(OrdersService);

  await usersService.seedInitialUsers();
  await productsService.seedInitialProducts();
  await ordersService.seedInitialOrders();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
