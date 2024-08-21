import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
  UploadedFile,
  UseInterceptors,
  Body,
  Res,
  HttpStatus,
  HttpException,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { Response } from 'express';
import { unlinkSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

@Controller('upload')
export class NewsController {
  private fileMetadata: { [key: string]: { description: string; content: string; postTime: string } } = {};

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Specify the destination folder
        filename: (req, file, callback) => {
          // Generate a unique filename with the original file extension
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueSuffix);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
    @Body('content') content: string,
    @Body('postTime') postTime: string,
  ) {
    // If postTime is not provided, set it to the current date and time
    const currentTime = new Date().toISOString();
    const actualPostTime = postTime || currentTime;

    // Save metadata
    this.fileMetadata[file.filename] = {
      description,
      content,
      postTime: actualPostTime,
    };

    // Construct the file URL
    const fileUrl = `http://localhost:8080/uploads/${file.filename}`;

    // Return the file URL and the additional form data
    return {
      imageUrl: fileUrl,
      description,
      content,
      postTime: actualPostTime,
    };
  }

  @Get('image/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = `./uploads/${filename}`;
    if (existsSync(filePath)) {
      res.sendFile(filePath, { root: '.' });
    } else {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete('image/:filename')
  deleteFile(@Param('filename') filename: string) {
    const filePath = `./uploads/${filename}`;
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

  @Put('image/:filename')
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
      };
      return this.fileMetadata[filename];
    } else {
      throw new HttpException('File metadata not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('files')
  getAllFiles() {
    try {
      const files = readdirSync('./uploads');
      const fileData = files.map(file => {
        const filePath = join('./uploads', file);
        const stats = statSync(filePath);
        return {
          filename: file,
          size: stats.size,
          modifiedTime: stats.mtime,
          ...this.fileMetadata[file],
        };
      });
      return fileData;
    } catch (err) {
      throw new HttpException('Error retrieving files', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
