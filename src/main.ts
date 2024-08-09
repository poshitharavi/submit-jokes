import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  const port = process.env.PORT || 3011;
  await app.listen(port);
  Logger.log(
    `🚀 Submit jokes Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
