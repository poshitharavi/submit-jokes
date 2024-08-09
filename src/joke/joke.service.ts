import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJokeDto } from './dtos/create-joke.dto';
import { Joke } from '@prisma/client';

@Injectable()
export class JokeService {
  constructor(private prisma: PrismaService) {}

  async createJoke(createJokeDto: CreateJokeDto): Promise<Joke> {
    return this.prisma.joke.create({
      data: createJokeDto,
    });
  }
}
