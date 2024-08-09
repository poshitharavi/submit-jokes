import {
  Body,
  ConflictException,
  Controller,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { JokeService } from './joke.service';
import { CategoryService } from 'src/category/category.service';
import { CreateJokeDto } from './dtos/create-joke.dto';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

@Controller('joke')
export class JokeController {
  private readonly logger = new Logger(JokeController.name);

  constructor(
    private readonly jokeService: JokeService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post('create')
  async createNewJoke(
    @Res() response: Response,
    @Body() createJokeDto: CreateJokeDto,
  ): Promise<any> {
    try {
      const newJoke = await this.jokeService.createJoke(createJokeDto);

      // Add the category
      await this.categoryService.createCategory({
        name: createJokeDto.category,
        description: createJokeDto.category,
      });

      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Successfully created new joke',
        body: {
          newJoke,
        },
      });
    } catch (error) {
      this.logger.error(`Error at /jokes/create: ${error.message}`);
      if (error instanceof ConflictException) {
        // Handle UnauthorizedException differently
        return response.status(StatusCodes.CONFLICT).json({
          message: error.message,
          error: getReasonPhrase(StatusCodes.CONFLICT),
          statusCode: StatusCodes.CONFLICT,
        });
      }
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
