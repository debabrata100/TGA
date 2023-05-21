import { Neo4jService } from '@dbc-tech/nest-neo4j';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly neo: Neo4jService) {}
  async create(dto: CreateOrderDto) {
    const query = `CREATE (o:Order {id: $id, 
      userId: $userId,
      productIds: $productIds,
      orderDate: $orderDate,
      orderStatus: $orderStatus,
      orderTotal: $orderTotal,
      orderAddress: $orderAddress
    })`;
    const params = { id: Date.now().toString(), ...dto };
    const result = await this.neo.write(query, params);
    console.log(result);
    return result;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
