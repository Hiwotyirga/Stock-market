import { Controller, Post, UseInterceptors, UploadedFile, Body, Param, Get, Put, Delete, Query, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { MediaEntity } from 'src/Entity/Media.entity';
import { Response } from 'express';
import { join } from 'path';

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

  @Get('files')
  async findAllMedia(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ items: MediaEntity[], total: number }> {
    return this.mediaService.findAllMedia(page, limit);
  }

  @Get('file/:id')
  async findOneMedia(@Param('id') id: string): Promise<{ media: MediaEntity, imageUrl: string }> {
    return this.mediaService.findOneMedia(id);
  }

  @Put('file/:id')
  async updateFile(
    @Param('id') id: string,
    @Body('description') description: string,
    @Body('content') content: string,
  ): Promise<Partial<MediaEntity>> {
    return this.mediaService.updateFile(id, description, content);
  }

  @Delete('file/:id')
  async deleteFile(@Param('id') id: string): Promise<void> {
    await this.mediaService.deleteFile(id);
  }

  @Get('download/:filename')
  async downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'src', 'Image', filename);
    res.sendFile(filePath);
  }
  @Get('count')
  async getMediaCount(): Promise<{ count: number }> {
    const count = await this.mediaService.countMedia();
    return { count };
  }
}
