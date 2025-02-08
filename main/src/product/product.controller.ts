import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './product.service';
import { Product } from './schema/product.schema';
import { EventPattern } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  // async create(@Body() productDto: any): Promise<Product> {
  //   return this.productsService.create(productDto);
  // }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

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
  @EventPattern('hello')
  async hello(data: string) {
    console.log('Received event from admin product : ', data);
  }
}
