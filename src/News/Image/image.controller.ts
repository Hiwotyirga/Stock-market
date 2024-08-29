import { Controller, Post, UseInterceptors, UploadedFile, Body, Param, Get, Put, Delete, Res, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { FileEntity } from 'src/Entity/FileEntity .entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { NotFoundException } from '@nestjs/common';
import { Response } from 'express'; // Import Response type
import { join } from 'path'; // Import join function from path module
import { createReadStream } from 'fs';
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('describe') describe: string,
    @Body('content') content: string,
  ): Promise<FileEntity> {
    return this.imageService.handleFileUpload(file, describe, content);
  }
  @Get('upload/download/:filename')
  async downloadFile(@Param('filename') filename: string, @Res() res: any) {
    const filePath = join(__dirname, '..', 'src/Image', filename); // Adjust the path as necessary
    res.sendFile(filePath);
  }
  

  @Get('upload/file')
  async findAllFile(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<FileEntity[]> {
    return this.imageService.findAllImage(page, limit);
  }
  

  @Get('upload/file/:id')
  async findOneImage(@Param('id') id: number): Promise<FileEntity> {
    const file = await this.imageService.findOneImage(id);
    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
    return file;
  }
  @Put('upload/file/:id')
    @UseGuards(AuthGuard)
    async updateFile(
      @Param('id') id: number,
      @Body('describe') describe: string,
      @Body('content') content: string,
    ): Promise<Partial<FileEntity>> {
      console.log(`Received request to update file with ID: ${id}, describe: ${describe}, content: ${content}`);

      return this.imageService.updateFile(id, describe, content);
    }


  @Delete('upload/file/:id')
  @UseGuards(AuthGuard)
  async deleteFile(@Param('id') id: number): Promise<void> {
    await this.imageService.deleteFile(id);
  }
}
