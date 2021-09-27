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
} from '@nestjs/common';
import { GoodService } from './good.service';
import { Good } from '../../entities/Good';
import { CreateUserDto } from '../../dto/user.dto';

@Controller('goods')
export class GoodController {
  constructor(private readonly goodService: GoodService) {}

  @Get()
  @HttpCode(200)
  async getGoods() {
    const users = await this.goodService.getGoods();

    if (!users) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    }
    return users.map(Good.toResponse);
  }

  @Get(':id')
  @HttpCode(200)
  async getOneGood(@Param('id') id: string): Promise<Good | undefined> {
    const good = await this.goodService.getGood(id);
    if (!good) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    }
    return Good.toResponse(good);
  }

  @Post()
  @HttpCode(201)
  async createGood(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Good | undefined> {
    console.log(createUserDto);
    const response = await this.goodService.createGood(createUserDto);
    if (!response) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    }
    return Good.toResponse(response);
  }

  @Put(':id')
  @HttpCode(200)
  updateGood(
    @Body() updateGoodDto: CreateUserDto,
    @Param('id') id: string | undefined,
  ) {
    return this.goodService.updateGood(id, updateGoodDto);
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteOne(@Param('id') id: string | number) {
    const deleted = await this.goodService.deleteBoard(id);

    if (!deleted.affected) {
      throw new HttpException('No Content!', HttpStatus.NO_CONTENT);
    }

    return null;
  }
}
