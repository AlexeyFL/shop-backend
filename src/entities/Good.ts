import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'good' })
export class Good {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { nullable: true })
  name: string;

  @Column('json', { nullable: true })
  imageUrls: string[];

  @Column('json', { nullable: true })
  category: string[];

  @Column('json', { nullable: true })
  subCategory: string[];

  @Column('int', { nullable: true })
  rating: number;

  @Column('int', { nullable: true })
  availableAmount: number;

  @Column('int', { nullable: true })
  price: number;

  @Column('text', { nullable: true })
  description: string;

  static toResponse(good: Good | undefined): Good | undefined {
    if (good !== undefined) {
      const {
        id,
        name,
        imageUrls,
        category,
        subCategory,
        rating,
        availableAmount,
        price,
        description,
      } = good;
      return {
        id,
        name,
        imageUrls,
        category,
        subCategory,
        rating,
        availableAmount,
        price,
        description,
      };
    }
    return undefined;
  }
}
