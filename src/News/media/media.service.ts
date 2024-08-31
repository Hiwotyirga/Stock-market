import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaEntity } from 'src/Entity/Media.enetity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaEntity)
    private readonly mediaRepository: Repository<MediaEntity>,
  ) {}

  async handleFileUpload(
    file: Express.Multer.File,
    description: string,
    content: string,
  ): Promise<MediaEntity> {
    if (file.size > 10 * 1024 * 1024) {
      throw new BadRequestException('File size exceeds limit');
    }

    const mediaInfo = await this.mediaRepository.save({
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      description,
      content,
      postTime: new Date(),
    });

    return mediaInfo;
  }

  async findAllMedia(page: number = 1, limit: number = 10): Promise<{ items: MediaEntity[], total: number }> {
    const [items, total] = await this.mediaRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }

  async findOneMedia(id: number): Promise<MediaEntity> {
    const media = await this.mediaRepository.findOne({ where: { id } });
    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
    return media;
  }

  async updateFile(
    id: number,
    description: string,
    content: string,
  ): Promise<Partial<MediaEntity>> {
    const media = await this.mediaRepository.preload({
      id,
      description,
      content,
    });

    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }

    return this.mediaRepository.save(media);
  }

  async deleteFile(id: number): Promise<void> {
    const result = await this.mediaRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
  }
}
