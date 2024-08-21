import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/Entity/news.entity';
// import { NewsService } from './new.service';
import { NewsController } from './new.controller';
import { VideoUploadController } from './video-upload/video-upload.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([News]),
    HttpModule,
    CacheModule.register({
      ttl: 3600, // Default TTL for cache
    }),
  ],
  providers: [],
  controllers: [NewsController, VideoUploadController],
})
export class NewModule {}
