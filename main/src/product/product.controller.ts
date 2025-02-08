import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './product.service';
import { Product } from './schema/product.schema';
import { EventPattern } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // create product with rabbitMQ
  // @Post()
  // @EventPattern('product_created')
  // async create(@Body() product: any): Promise<Product> {
  //   console.log(product);
  //   return this.productsService.create(product);
  // }

  @EventPattern('product_created')
  async handleProductCreatedEvent(product: Product) {
    console.log('Received "product_created" event from RabbitMQ:', product);
    return this.productsService.create(product);
  }

  @Get()
  // @EventPattern('hello')
  async findAll(data: string): Promise<Product[]> {
    console.log('Received event for get all products : ', data);
    return this.productsService.findAll();
  }

  // ========================

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<Product> {
  //   return this.productsService.findOne(id);
  // }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() productDto: any,
  // ): Promise<Product> {
  //   return this.productsService.update(id, productDto);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string): Promise<Product> {
  //   return this.productsService.delete(id);
  // }

  // ===================== RABBITMQ ========================
  // @EventPattern('hello')
  // async hello(data: string) {
  //   console.log('Received event from admin product : ', data);
  // }
}
