import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ConnectionOptions from './ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoodModule } from './good/good.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GoodModule,
    CategoryModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ConnectionOptions,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
