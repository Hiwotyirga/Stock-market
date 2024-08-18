import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Role } from './Entity/Role.entity';
import { AdminRegister } from './Entity/AdminRegister.entity';
// import { NewService } from './new/new.service';
import { NewModule } from './new/new.module';
// import { NewController } from './new/new.controller';
// import { NewService } from './new/new.service';


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
    TypeOrmModule.forFeature([User, Role, AdminRegister]),
    AuthModule,
    UsersModule,
    NewModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
