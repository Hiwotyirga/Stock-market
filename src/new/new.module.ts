import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NewService } from './new.service';
import { NewController } from './new.controller';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 3600, // Default TTL for cache
    }),
  ],
  providers: [NewService],
  controllers: [NewController],
})
export class NewModule {}
