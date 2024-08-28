import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { FileEntity } from 'src/Entity/FileEntity .entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async handleFileUpload(
    file: Express.Multer.File,
    describe: string,
    content: string,
  ) {
    if (file.size > 10 * 1024 * 1024) { 
      throw new BadRequestException('File size exceeds limit');
    }

    const fileInfo = await this.fileRepository.save({
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      describe,
      content,
      postTime: new Date(),
    });

    return fileInfo;
  }
  async findAllImage(): Promise<FileEntity[]> {
    return this.fileRepository.find(); 
  }

  async findOneImage(id: number): Promise<FileEntity> {
    const fileFind = await this.fileRepository.findOne({ where: { id } });
    if (!fileFind) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
    return fileFind;
  }
}
