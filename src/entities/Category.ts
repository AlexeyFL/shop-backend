import { ICategory } from '../models/Category';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IGood } from '../models/Good';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  categoryId: string;

  @Column('varchar', { nullable: true })
  name: string;

  @Column('json', { nullable: true })
  subCategory?: ICategory[];

  @Column('json', { nullable: true })
  goods?: IGood[];

  @Column('text', { nullable: true })
  description: string;

  static toResponse(category: Category | undefined): Category | undefined {
    if (category !== undefined) {
      const { id, categoryId, name, subCategory, description } = category;
      return {
        id,
        categoryId,
        name,
        subCategory,
        description,
      };
    }
    return undefined;
  }
}
