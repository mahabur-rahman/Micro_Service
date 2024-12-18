import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix('api');

  // app.enableCors({
  //   origin: 'http://localhost:3000',
  // });

  // await app.listen(process.env.PORT ?? 8001);

  const app = await NestFactory.createMicroservice(AppModule, {
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
  });

  // Corrected: Remove the callback from `listen()`
  await app.listen();
  console.log(`Microservice is listening...`);
}
bootstrap();
