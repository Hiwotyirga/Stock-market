import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoEntity } from 'src/Entity/VideoEntity.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
  ) {}

  async handleFileUpload(
    file: Express.Multer.File,
    description: string,
    content: string,
  ): Promise<VideoEntity> {
    console.log('File details:', {
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
    });

    if (file.size > 1 * 1024 * 1024 * 1024) { 
      throw new BadRequestException('File size exceeds limit');
    }

    const videoInfo = await this.videoRepository.save({
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      description,
      content,
      postTime: new Date(),
    });

    return videoInfo;
  }

  // In your service file
async findAllVideo(page: number = 1, limit: number = 10): Promise<{ items: VideoEntity[], total: number }> {
  const [items, total] = await this.videoRepository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
  });
  return { items, total };
}


  async findOneImage(id: number): Promise<VideoEntity> {
    const fileFind = await this.videoRepository.findOne({ where: { id } });
    if (!fileFind) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
    return fileFind;
  }
  async updateFile(
    id: number,
    description: string,
    content: string,
  ): Promise<VideoEntity> {
    const video = await this.videoRepository.preload({
      id,
      description,
      content,
    });

    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }

    return this.videoRepository.save(video);
  }

  async deleteFile(id: number): Promise<void> {
    const result = await this.videoRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
  }
}
