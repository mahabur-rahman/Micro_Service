import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
  Put,
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
  // @Get()
  // findAll(): Promise<Product[]> {
  //   this.client.emit('hello', 'Hello from RabbitMq!'); // send event to RabbitMQ
  //   return this.productsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: number): Promise<Product> {
  //   return this.productsService.findOne(id);
  // }

  @Post()
  async create(@Body() product: Partial<Product>): Promise<Product> {
    const createdProduct = await this.productsService.create(product);

    this.client.emit('product_created', createdProduct); // Emit the created product to RabbitMQ

    return createdProduct;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: Partial<Product>,
  ): Promise<Product> {
    const updatedProduct = await this.productsService.update(id, product);

    this.client.emit('updated_product', updatedProduct);

    return updatedProduct;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.productsService.remove(id);

    this.client.emit('product_deleted', id);
  }
}
