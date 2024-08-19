import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('upload')
export class NewsController {
  @Post('image')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // Specify the destination folder
      filename: (req, file, callback) => {
        // Generate a unique filename with the original file extension
        const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
        callback(null, uniqueSuffix);
      },
    }),
  }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
    @Body('content') content: string,
    @Body('postTime') postTime: string,
  ) {
    // Construct the file URL
    const fileUrl = `http://localhost:8080/uploads/${file.filename}`;

    // Return the file URL and the additional form data
    return {
      imageUrl: fileUrl,
      description,
      content,
      postTime,
    };
  }
}
