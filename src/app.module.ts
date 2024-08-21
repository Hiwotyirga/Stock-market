import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Role } from './Entity/Role.entity';
import { AdminRegister } from './Entity/AdminRegister.entity';

import { NewModule } from './new/new.module';
// import * as session from 'express-session';
// import * as passport from 'passport';
import { CacheModule } from '@nestjs/cache-manager';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { NewsService } from './new/new.service';
import { News } from './Entity/news.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'selam',
      database: 'StockMarket',
      entities: [User, Role, AdminRegister],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Role, AdminRegister, News]),
    AuthModule,
    UsersModule,
    NewModule,

    MulterModule.register({
      dest: './uploads', // Directory where files will be saved
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
