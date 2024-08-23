import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Delete,
  Put,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Res,
  UseGuards,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join, basename } from 'path';
import { Response } from 'express';
import { unlinkSync, existsSync } from 'fs';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('upload')
export class NewsController {
  private fileMetadata: {
    [key: string]: {
      description: string;
      content: string;
      postTime: string;
      type: string;
    };
  } = {};

  @Post('media') 
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Store uploads in the "uploads" directory
        filename: (req, file, callback) => {
          const originalName = `${uuidv4()}${extname(file.originalname)}`;
          let filePath = join(process.cwd(), 'uploads', originalName); // Store in the same folder

          let counter = 1;
          while (existsSync(filePath)) {
            const fileNameWithoutExt = basename(
              originalName,
              extname(file.originalname),
            );
            const fileExt = extname(file.originalname);
            filePath = join(
              process.cwd(),
              'uploads',
              `${fileNameWithoutExt}-${counter}${fileExt}`,
            );
            counter++;
          }

          callback(null, basename(filePath)); // Get the final file name after conflict check
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
          'image/jpeg',
          'image/png',
          'image/gif', // For images
          'video/mp4',
          'video/mkv',
          'video/avi',
          'video/mov', // For videos
        ];

        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(
            new HttpException(
              'Invalid file type. Only images and videos are allowed',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
      },
      limits: { fileSize: 500 * 1024 * 1024 }, // Increased file size limit to 100MB for videos
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
    @Body('content') content: string,
    @Body('postTime') postTime: string,
  ) {
    if (!description || !content) {
      throw new HttpException(
        'Description and content are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentTime = new Date().toISOString();
    const actualPostTime = postTime || currentTime;

    // Storing file metadata along with file type
    this.fileMetadata[file.filename] = {
      description,
      content,
      postTime: actualPostTime,
      type: file.mimetype.startsWith('image') ? 'image' : 'video',
    };

    const fileUrl = `http://localhost:8080/uploads/${file.filename}`;
    return {
      mediaUrl: fileUrl,
      description,
      content,
      postTime: actualPostTime,
      type: file.mimetype.startsWith('image') ? 'image' : 'video', // Return file type
    };
  }

  @Get('media/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads', filename);
    if (existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete('media/:filename')
  deleteFile(@Param('filename') filename: string) {
    const filePath = join(process.cwd(), 'uploads', filename);
    if (existsSync(filePath)) {
      unlinkSync(filePath);
      delete this.fileMetadata[filename];
      return { message: 'File deleted successfully' };
    } else {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('metadata/:filename')
  getFileMetadata(@Param('filename') filename: string) {
    const metadata = this.fileMetadata[filename];
    if (metadata) {
      return metadata;
    } else {
      throw new HttpException('Metadata not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put('media/:filename')
  async updateFileMetadata(
    @Param('filename') filename: string,
    @Body('description') description: string,
    @Body('content') content: string,
    @Body('postTime') postTime: string,
  ) {
    const metadata = this.fileMetadata[filename];
    if (metadata) {
      this.fileMetadata[filename] = {
        description: description || metadata.description,
        content: content || metadata.content,
        postTime: postTime || metadata.postTime,
        type: metadata.type, // Preserve the file type
      };
      return this.fileMetadata[filename];
    } else {
      throw new HttpException('File metadata not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('files')
  getFiles(@Query('page') page = 1, @Query('limit') limit = 5) {
    const skip = (page - 1) * limit;
    const files = Object.keys(this.fileMetadata)
      .slice(skip, skip + limit)
      .map((filename) => ({
        filename,
        ...this.fileMetadata[filename],
      }));

    return {
      files,
      total: Object.keys(this.fileMetadata).length,
    };
  }
}
