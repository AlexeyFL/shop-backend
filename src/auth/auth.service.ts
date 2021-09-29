import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { User } from '../entities/User';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async getUserByLogin(userLogin: string): Promise<User | undefined> {
    const user = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.login = :userLoginDb', {
        userLoginDb: userLogin,
      })
      .getOne();

    return user;
  }

  async validateUser(login: string, password: string) {
    const user = await this.getUserByLogin(login);
    console.log('password', password);
    console.log('user', user);
    console.log(
      'bcrypt.compare',
      await bcrypt.compare(password, user.password),
    );
    if (await bcrypt.compare(password, user.password)) {
      console.log('bcrypt', await bcrypt.compare(password, user.password));
      return true;
    }
    return false;
  }
}
