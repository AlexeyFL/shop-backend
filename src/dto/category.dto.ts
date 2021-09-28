import { ICategory } from '../models/Category';
import { IGood } from '../models/Good';

export class CreateCategoryDto {
  id: string;
  name: string;
  categoryId: string;
  subCategory?: ICategory[];
  goods?: IGood[];
  description: string;
}
