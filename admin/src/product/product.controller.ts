import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Inject,
} from '@nestjs/common';
import { Product } from './entity/product.entity';
import { ProductsService } from './product.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  // Add rabbitMQ event for microservices
  @Get()
  findAll(): Promise<Product[]> {
    this.client.emit('hello', 'Hello from RabbitMq!'); // send event to RabbitMQ
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() product: Partial<Product>): Promise<Product> {
    return this.productsService.create(product);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() product: Partial<Product>,
  ): Promise<Product> {
    return this.productsService.update(id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
