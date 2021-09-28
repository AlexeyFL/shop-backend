import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Category } from '../entities/Category';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly repo: Repository<Category>,
  ) {}

  async getCategories(query): Promise<Category[]> {
    if (query.ids) {
      const ids = query.ids.split(',');
      const category = await getRepository(Category)
        .createQueryBuilder('category')
        .where('category.categoryId IN (:...category)', {
          category: ids,
        })
        .getMany();

      return category;
    } else {
      return this.repo.find();
    }
  }

  async getCategory(id: string | undefined): Promise<Category | undefined> {
    const category = await this.repo.findOne(id);
    if (!category) {
      return undefined;
    }
    return category;
  }

  async createCategory(category: Category): Promise<Category> {
    const newCategory = new Category();
    return this.repo.save({
      ...category,
      ...newCategory,
    });
  }

  async updateCategory(
    id: string | undefined,
    category: Category,
  ): Promise<Category | undefined> {
    const categoryDb = await this.repo.findOne(id);
    return this.repo.save({
      ...categoryDb,
      ...category,
    });
  }

  async deleteCategory(id: string | number) {
    return this.repo.delete(id);
  }
}
