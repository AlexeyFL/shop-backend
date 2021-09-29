import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  HttpCode,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/User';
import { CreateUserDto } from '../dto/user.dto';
import { IQuery } from '../interfaces/interfaces';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  async getUsers(@Query() query: IQuery) {
    const users = await this.userService.getUsers(query);

    if (!users) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    }
    return users.map(User.toResponse);
  }

  @Get('/search')
  @HttpCode(200)
  async getUsersByLogin(@Query() query: IQuery) {
    const users = await this.userService.getUsersByLogin(query);

    if (!users) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    }
    return users.map(User.toResponse);
  }

  @Get(':id')
  @HttpCode(200)
  async getOneUser(@Param('id') id: string): Promise<User | undefined> {
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    }
    return User.toResponse(user);
  }

  @Post()
  @HttpCode(201)
  async createUser(
    @Body() CreateUserDto: CreateUserDto,
  ): Promise<User | undefined> {
    console.log(CreateUserDto);
    const response = await this.userService.createUser(CreateUserDto);
    if (!response) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    }
    return User.toResponse(response);
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(
    @Body() updateUserDto: CreateUserDto,
    @Param('id') id: string | undefined,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteOne(@Param('id') id: string | number) {
    const deleted = await this.userService.deleteBoard(id);

    if (!deleted.affected) {
      throw new HttpException('No Content!', HttpStatus.NO_CONTENT);
    }

    return null;
  }
}
