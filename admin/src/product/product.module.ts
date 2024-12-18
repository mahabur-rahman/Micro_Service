import { Module } from '@nestjs/common';
import { Product } from './entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './product.service';
import { ProductsController } from './product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://pappqdwm:l4izHFOY4545iHrsFbHPW8yGq7osjyYb@seal.lmq.cloudamqp.com/pappqdwm',
          ],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductModule {}
