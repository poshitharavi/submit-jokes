import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  dotenv.config();

  const port = 8080;
  await app.listen(port);
  Logger.log(
    `🚀 Submit jokes Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
