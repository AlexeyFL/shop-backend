import { IGood } from './Good';

export interface ICategory {
  id: string;
  name: string;
  categoryId: string;
  subCategory?: ICategory[];
  description: string;
  goods?: IGood[];
}
