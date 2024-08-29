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
  // In your service file
async findAllImage(page: number = 1, limit: number = 10): Promise<FileEntity[]> {
  const [result, total] = await this.fileRepository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
  });
  return result;
}


async findOneImage(id: number): Promise<FileEntity> {
  const fileFind = await this.fileRepository.findOne({ where: { id } });
  if (!fileFind) {
    throw new NotFoundException(`File with ID ${id} not found`);
  }
  return fileFind;
}

  async updateFile(
    id: number,
    describe: string,
    content: string,
  ): Promise<Partial<FileEntity>> {
    console.log(`Updating file with ID: ${id}, describe: ${describe}, content: ${content}`);
  
    const file = await this.fileRepository.preload({
      id,
      describe,
      content,
    });
  
    if (!file) {
      console.error(`File with ID ${id} not found`);
      throw new NotFoundException(`File with ID ${id} not found`);
    }
  
    return this.fileRepository.save(file);
  }
  

  async deleteFile(id: number): Promise<void> {
    const result = await this.fileRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
  }
}
