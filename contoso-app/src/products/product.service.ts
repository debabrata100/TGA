import { Neo4jService } from '@dbc-tech/nest-neo4j';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly neo4jService: Neo4jService) {
    console.log('Product service contridtcd');
  }

  async addProduct(dto: CreateProductDto) {
    const id = Date.now().toString();
    const result = await this.neo4jService.write(
      `CREATE (p: Product {
          id: $id, 
          title: $title, 
          price: $price, 
          quantity: $quantity, 
          outOfStock: $outOfStock }) RETURN p`,
      { id, ...dto },
    );
    console.log(result);
    return id;
  }
  async getAllProduct() {
    const results = await this.neo4jService.read(`MATCH (q:Product) RETURN q`);
    console.log(results.records);
    return results.records.map((r) => r.get('q').properties);
  }
}
