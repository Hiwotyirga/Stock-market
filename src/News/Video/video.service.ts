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

    if (file.size > 1 * 1024 * 1024 * 1024) { // 1 GB limit
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

  async findAllImage(): Promise<VideoEntity[]> {
    return this.videoRepository.find(); // Await is not needed here as find() returns a Promise
  }

  async findOneImage(id: number): Promise<VideoEntity> {
    const fileFind = await this.videoRepository.findOne({ where: { id } });
    if (!fileFind) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
    return fileFind;
  }
}
