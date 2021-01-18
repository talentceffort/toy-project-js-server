import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // decroator 가 없는 property 는 걸러서 받음.
      forbidNonWhitelisted: true, // whiltelist 에 해당하는 Request 자체를 막음.
      transform: true, // param 을 내가 원하는 타입으로 변경해줌.
    }),
  );
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  await app.listen(8080);
}
bootstrap();
