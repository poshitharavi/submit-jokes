import { Module } from '@nestjs/common';
import { JokeController } from './joke.controller';
import { JokeService } from './joke.service';
import { CategoryService } from 'src/category/category.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'JOKE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://uesqotnl:iQ6EfTPs_uaNCpoDCb37jUOzoQa2bgCf@cougar.rmq.cloudamqp.com/uesqotnl',
          ],
          queue: 'delivery_jokes_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [JokeController],
  providers: [JokeService, CategoryService],
})
export class JokeModule {}
