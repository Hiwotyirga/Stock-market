import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MediaEntity } from 'src/Entity/Media.enetity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '..', '..', '..', 'src', 'Image'), // Directory to save files
        filename: (req, file, cb) => {
          const ext = file.originalname.split('.').pop();
          const filename = `${Date.now()}.${ext}`;
          cb(null, filename);
        },
      }),
      limits: {
        fileSize: 1 * 1024 * 1024 * 1024, // 10 MB limit for file size
      },
    }),
    TypeOrmModule.forFeature([MediaEntity]),
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
