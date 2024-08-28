import { Controller, Post, UseInterceptors, UploadedFile, Body, Param, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { FileEntity } from 'src/Entity/FileEntity .entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { NotFoundException } from '@nestjs/common';
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
  @Get('upload/file')
  async findAllFile(): Promise<FileEntity[]> {
    return this.imageService.findAllImage();
  }

  @Get('upload/file/:id')
  async findOneImage(@Param('id') id: number): Promise<FileEntity> {
    const file = await this.imageService.findOneImage(id);
    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
    return file;
  }
}
