import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Good } from '../entities/Good';
import { IQuery } from '../interfaces/interfaces';

@Injectable()
export class GoodService {
  constructor(
    @InjectRepository(Good) private readonly repo: Repository<Good>,
  ) {}

  async getGoods(query: IQuery): Promise<Good[]> {
    if (query.ids) {
      const ids = query.ids.split(',');
      const good = await getRepository(Good)
        .createQueryBuilder('good')
        .where('good.id IN (:...good)', {
          good: ids,
        })
        .getMany();
      return good;
    } else {
      return this.repo.find();
    }
  }

  async getGoodsByName(query: IQuery) {
    console.log(query);
    const allGoods = await this.getGoods(query);
    return allGoods.filter(
      (item) => item.name.toLowerCase().indexOf(query.name.toLowerCase()) >= 0,
    );
  }

  async getGood(id: string | undefined): Promise<Good | undefined> {
    const good = await this.repo.findOne(id);
    if (!good) {
      return undefined;
    }
    return good;
  }

  async createGood(good: Good): Promise<Good> {
    const newGood = new Good();
    return this.repo.save({
      ...good,
      ...newGood,
    });
  }

  async updateGood(
    id: string | undefined,
    good: Good,
  ): Promise<Good | undefined> {
    const goodDb = await this.repo.findOne(id);
    return this.repo.save({
      ...goodDb,
      ...good,
    });
  }

  async deleteBoard(id: string | number) {
    return this.repo.delete(id);
  }
}
