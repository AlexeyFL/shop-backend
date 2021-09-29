import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { User } from '../entities/User';
import { IQuery } from '../interfaces/interfaces';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async getUsers(query: IQuery): Promise<User[]> {
    if (query.ids) {
      const ids = query.ids.split(',');
      const user = await getRepository(User)
        .createQueryBuilder('user')
        .where('user.id IN (:...user)', {
          user: ids,
        })
        .getMany();
      return user;
    } else {
      return this.repo.find();
    }
  }

  async getUsersByLogin(query: IQuery) {
    console.log(query);
    const allUsers = await this.getUsers(query);
    return allUsers.filter(
      (item) =>
        item.login.toLowerCase().indexOf(query.login.toLowerCase()) >= 0,
    );
  }

  async getUser(id: string | undefined): Promise<User | undefined> {
    const user = await this.repo.findOne(id);
    if (!user) {
      return undefined;
    }
    return user;
  }

  async createUser(user: User): Promise<User> {
    const newUser = new User();
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    return this.repo.save({
      ...user,
      ...newUser,
      password: hashedPassword,
    });
  }

  async updateUser(
    id: string | undefined,
    user: User,
  ): Promise<User | undefined> {
    const userDb = await this.repo.findOne(id);
    return this.repo.save({
      ...userDb,
      ...user,
    });
  }

  async deleteBoard(id: string | number) {
    return this.repo.delete(id);
  }
}
