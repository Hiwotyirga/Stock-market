import { Controller, Post, UseInterceptors, UploadedFile, Body, Param, Get, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { VideoEntity } from 'src/Entity/VideoEntity.entity';
import { BadRequestException } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
    @Body('content') content: string,
  ): Promise<VideoEntity> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.videoService.handleFileUpload(file, description, content);
  }

  @Get('upload/video')
  async findAllFile(): Promise<VideoEntity[]> {
    return this.videoService.findAllImage();
  }

  @Get('upload/video/:id')
  async findOneImage(@Param('id') id: number): Promise<VideoEntity> {
    const file = await this.videoService.findOneImage(id);
    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
    return file;
  }
}
