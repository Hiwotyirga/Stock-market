import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaEntity } from 'src/Entity/Media.entity';
import { UploadMediaDto } from 'src/Dtos/Upload/UploadMediaDto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,
  ) {}

  async uploadMedia(uploadDto: UploadMediaDto): Promise<MediaEntity> {
    const media = new MediaEntity();

    if (uploadDto.file) {
      media.filename = uploadDto.file.originalname; 
      media.mimetype = uploadDto.file.mimetype; 
      
    }

    media.description = uploadDto.description; 
    media.title = uploadDto.title;
    media.externalLink = uploadDto.link; 

    return await this.mediaRepository.save(media);
  }

  async getAllMedia(): Promise<MediaEntity[]> {
    return this.mediaRepository.find();
  }

  async getMediaById(id: string): Promise<MediaEntity> {
    const media = await this.mediaRepository.findOneBy({ id });
    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
    return media;
  }


   // Method to count total media files
   async countMedia(): Promise<number> {
    return await this.mediaRepository.count();
  }

  async updateMedia(id: string, uploadDto: UploadMediaDto): Promise<MediaEntity> {
    const media = await this.mediaRepository.findOneBy({ id });
    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }

    if (uploadDto.file) {
      media.filename = uploadDto.file.originalname;
      media.mimetype = uploadDto.file.mimetype; 
 
    }

    if (uploadDto.link) {
      media.externalLink = uploadDto.link; 
    }

    media.description = uploadDto.description;
    media.title = uploadDto.title; 

    return await this.mediaRepository.save(media);
  }

  async deleteMedia(id: string): Promise<void> {
    const result = await this.mediaRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
  }
}
