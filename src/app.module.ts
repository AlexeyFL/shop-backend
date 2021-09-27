import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ConnectionOptions from './ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoodController } from './good/good/good.controller';
import { GoodService } from './good/good/good.service';
import { GoodModule } from './good/good/good.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GoodModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ConnectionOptions,
    }),
  ],
  controllers: [AppController, GoodController],
  providers: [AppService],
})
export class AppModule {}
