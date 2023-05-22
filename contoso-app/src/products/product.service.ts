import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async addProduct(dto: CreateProductDto) {
    const id = Date.now().toString();
    const query = `CREATE (p: Product {
      id: $id, 
      title: $title, 
      price: $price, 
      quantity: $quantity, 
      outOfStock: $outOfStock }) RETURN p`;
    const params = { id, ...dto };
    const result = await this.productRepo.addNode(query, params);

    console.log(result);
    return id;
  }
  async getAllProduct() {
    const query = `MATCH (q:Product) RETURN q`;
    const results = await this.productRepo.getNode(query, {});
    console.log('---', JSON.stringify(results.records));
    return results.records.map((r) => r.get('q').properties);
  }
}
