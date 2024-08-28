import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { VideoEntity } from 'src/Entity/VideoEntity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Directory to save files
        filename: (req, file, cb) => {
          const ext = file.originalname.split('.').pop();
          const filename = `${Date.now()}.${ext}`;
          cb(null, filename);
        },
      }),
      limits: {
        fileSize: 1 * 1024 * 1024 * 1024, // 1 GB limit for file size
      },
    }),
    TypeOrmModule.forFeature([VideoEntity]), // Register entity
    UsersModule
  ],
  controllers: [VideoController],
  providers: [VideoService, AuthGuard],
})
export class VideoModule {}
