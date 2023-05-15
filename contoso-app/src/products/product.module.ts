import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [],
})
export class ProductModule {}
