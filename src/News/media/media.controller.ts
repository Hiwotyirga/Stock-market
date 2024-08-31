import { Controller, Post, UseInterceptors, UploadedFile, Body, Param, Get, Put, Delete, Query, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { MediaEntity } from 'src/Entity/Media.enetity';
import { Response } from 'express';
import { join } from 'path';
import { createReadStream } from 'fs';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
    @Body('content') content: string,
  ): Promise<MediaEntity> {
    return this.mediaService.handleFileUpload(file, description, content);
  }

  @Get('download/:filename')
  async downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', 'uploads', filename);
    res.sendFile(filePath);
  }

  @Get('files')
  async findAllMedia(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ items: MediaEntity[], total: number }> {
    return this.mediaService.findAllMedia(page, limit);
  }

  @Get('file/:id')
  async findOneMedia(@Param('id') id: number): Promise<MediaEntity> {
    return this.mediaService.findOneMedia(id);
  }

  @Put('file/:id')
    async updateFile(@Param('id') id: number,
    @Body('description') description: string,
    @Body('content') content: string,
    ): Promise<Partial<MediaEntity>> {
    console.log(`Updating media with ID: ${id}`); // Debugging log
    return this.mediaService.updateFile(id, description, content);
    }


  @Delete('file/:id')
  async deleteFile(@Param('id') id: number): Promise<void> {
    await this.mediaService.deleteFile(id);
  }
}
