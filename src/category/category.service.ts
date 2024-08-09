import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  // Create new category
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.prisma.category.upsert({
      where: {
        name: createCategoryDto.name,
      },
      update: {
        description: createCategoryDto.description,
      },
      create: {
        ...createCategoryDto,
      },
    });
  }

  // Provide available joke types (categories)
  async getJokeTypes(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }
}
