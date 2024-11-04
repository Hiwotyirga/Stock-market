import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MediaEntity } from '../../Entity/Media.entity'; // Adjust the path based on your structure
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '..', '..', 'src', 'Image'), // Directory to save files
        filename: (req, file, cb) => {
          const ext = file.originalname.split('.').pop();
          const filename = `${Date.now()}.${ext}`;
          cb(null, filename);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB limit for file size
      },
    }),
    TypeOrmModule.forFeature([MediaEntity]),
    // Serve static files (like images) from the 'Image' directory
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'src', 'Image'), // Directory where the images are stored
      serveRoot: '/images', // URL prefix to access the images
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
