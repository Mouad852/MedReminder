/* eslint-disable */
/* prettier-ignore */

/* eslint-disable prettier/prettier */

import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation for all incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown properties
      forbidNonWhitelisted: true, // throw error on unknown props
      transform: true, // auto-transform payloads to DTO classes
    }),
  );

  await app.listen(3000);
}
bootstrap();
