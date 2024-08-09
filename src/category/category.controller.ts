import {
  Body,
  ConflictException,
  Controller,
  Get,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Response } from 'express';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { MessagePattern } from '@nestjs/microservices';

@Controller('category')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);

  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  async createCategory(
    @Res() response: Response,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<any> {
    try {
      const category =
        await this.categoryService.createCategory(createCategoryDto);

      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Successfully created category',
        body: {
          category,
        },
      });
    } catch (error) {
      this.logger.error(`Error at /category/create: ${error.message}`);
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

  @Get('types')
  async getAllCategories(@Res() response: Response): Promise<any> {
    try {
      const categories = await this.categoryService.getJokeTypes();

      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Successfully retrieved all types',
        body: {
          categories,
        },
      });
    } catch (error) {
      this.logger.error(`Error at /category/all: ${error}`);
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @MessagePattern({ cmd: 'jokeTypes' })
  async getAllTypes() {
    const types = await this.categoryService.getJokeTypes();

    return types;
  }
}
