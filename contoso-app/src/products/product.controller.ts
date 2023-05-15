import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductQtyDto } from './dto/update-qty.dto';

@Controller('products')
export class ProductsController {
  private products = [];

  @Post('add')
  addProduct(@Body() body: CreateProductDto) {
    const id = Date.now().toString();
    const newProduct = {
      id,
      title: body.title,
      description: body.description,
      price: body.price,
    };
    this.products.push(newProduct);
    return this.products;
  }

  @Get()
  getAllProducts() {
    return [...this.products];
  }

  updateProductQty(@Body() body: UpdateProductQtyDto) {
    return 'dsd';
  }
}
