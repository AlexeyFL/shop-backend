import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Query,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '../entities/Category';
import { CreateCategoryDto } from '../dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpCode(200)
  async getCategories(@Query() query: Category) {
    const users = await this.categoryService.getCategories(query);

    if (!users) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    }
    return users.map(Category.toResponse);
  }

  @Get(':id')
  @HttpCode(200)
  async getOneCategory(@Param('id') id: string): Promise<Category | undefined> {
    const good = await this.categoryService.getCategory(id);
    if (!good) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    }
    return Category.toResponse(good);
  }

  @Post()
  @HttpCode(201)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category | undefined> {
    console.log(createCategoryDto);
    const response = await this.categoryService.createCategory(
      createCategoryDto,
    );
    if (!response) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    }
    return Category.toResponse(response);
  }

  @Put(':id')
  @HttpCode(200)
  updateCategory(
    @Body() updateCategoryDto: CreateCategoryDto,
    @Param('id') id: string | undefined,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteCategory(@Param('id') id: string | number) {
    const deleted = await this.categoryService.deleteCategory(id);

    if (!deleted.affected) {
      throw new HttpException('No Content!', HttpStatus.NO_CONTENT);
    }

    return null;
  }
}
