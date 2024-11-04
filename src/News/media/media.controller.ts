import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { UploadMediaDto } from '../../Dtos/Upload/UploadMediaDto';
import { MediaEntity } from '../../Entity/Media.entity'; // Adjust the path based on your structure


@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: UploadMediaDto,
  ): Promise<MediaEntity> {
    return this.mediaService.uploadMedia({ file, ...uploadDto });
  }

  // Move the 'count' endpoint before ':id' to avoid conflict
  @Get('count')
  async countAllMedia(): Promise<number> {
    return await this.mediaService.countMedia();
  }

  @Get()
  async getAllMedia(): Promise<MediaEntity[]> {
    return this.mediaService.getAllMedia();
  }

  @Get(':id')
  async getMediaById(@Param('id') id: string): Promise<MediaEntity> {
    return this.mediaService.getMediaById(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateMedia(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: UploadMediaDto,
  ): Promise<MediaEntity> {
    return this.mediaService.updateMedia(id, { file, ...uploadDto });
  }

  @Delete(':id')
  async deleteMedia(@Param('id') id: string): Promise<void> {
    return this.mediaService.deleteMedia(id);
  }
}
