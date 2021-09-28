import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodController } from './good.controller';
import { GoodService } from './good.service';
import { Good } from '../entities/Good';

@Module({
  imports: [TypeOrmModule.forFeature([Good])],
  controllers: [GoodController],
  providers: [GoodService],
  exports: [GoodService],
})
export class GoodModule {}
