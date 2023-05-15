import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductQtyDto } from './dto/update-qty.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post('add')
  addProduct(@Body() body: CreateProductDto) {
    return this.productService.addProduct(body);
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllProduct();
  }

  updateProductQty(@Body() body: UpdateProductQtyDto) {
    return 'dsd';
  }
}
