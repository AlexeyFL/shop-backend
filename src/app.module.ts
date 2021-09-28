import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ConnectionOptions from './ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoodController } from './good/good.controller';
import { GoodModule } from './good/good.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    GoodModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ConnectionOptions,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
