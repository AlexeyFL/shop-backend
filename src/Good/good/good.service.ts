import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Good } from '../../entities/Good';

@Injectable()
export class GoodService {
  constructor(
    @InjectRepository(Good) private readonly repo: Repository<Good>,
    private connection: Connection,
  ) {}

  async getGoods(): Promise<Good[]> {
    return this.repo.find();
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
