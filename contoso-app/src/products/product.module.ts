import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
