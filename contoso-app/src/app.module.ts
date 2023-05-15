import { Neo4jModule } from '@dbc-tech/nest-neo4j';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';

@Module({
  imports: [
    ProductModule,
    Neo4jModule.forRoot({
      scheme: 'bolt',
      host: 'localhost',
      port: 'bolt://localhost:7687',
      username: 'neo4j',
      password: 'Pass@123',
      disableLosslessIntegers: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
