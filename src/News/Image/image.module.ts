import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileEntity } from 'src/Entity/FileEntity .entity';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from 'src/auth/auth.guard';

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
    }),
    TypeOrmModule.forFeature([FileEntity]),
    UsersModule,
  ],
  controllers: [ImageController],
  providers: [ImageService, AuthGuard],
})
export class ImageModule {}
