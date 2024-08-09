import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { JokeModule } from './joke/joke.module';

@Module({
  imports: [PrismaModule, CategoryModule, JokeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
