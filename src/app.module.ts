// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './news/media/media.module';
import { StockModule } from './market-local/market-local.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { config } from './configure/orm.config';
import { UsersModule } from './users/users.module';
import { TopGainerModule } from './market-local/top-gainer/top-gainer.module';
import { TopLoserModule } from './market-local/top-loser/top-loser.module';
import { MostActivelyTradedModule } from './market-local/most-actively-traded/most-actively-traded.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(config),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
    UsersModule,
    MediaModule,
    // StockModule,
    PaymentMethodModule,
    TopGainerModule,
    TopLoserModule,
    MostActivelyTradedModule
  ],
  providers: [AppService],
})
export class AppModule {}