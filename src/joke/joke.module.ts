import { Module } from '@nestjs/common';
import { JokeController } from './joke.controller';
import { JokeService } from './joke.service';
import { CategoryService } from 'src/category/category.service';

@Module({
  controllers: [JokeController],
  providers: [JokeService, CategoryService],
})
export class JokeModule {}
