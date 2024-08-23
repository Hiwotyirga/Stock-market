// src/news/file.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsService {
  private fileMetadata: {
    [key: string]: { description: string; content: string; postTime: string };
  } = {};

  addFile(
    filename: string,
    metadata: { description: string; content: string; postTime: string },
  ) {
    this.fileMetadata[filename] = metadata;
  }

  getFiles(skip: number, limit: number) {
    const files = Object.keys(this.fileMetadata)
      .slice(skip, skip + limit)
      .map((filename) => ({
        filename,
        ...this.fileMetadata[filename],
      }));

    return {
      files,
      total: Object.keys(this.fileMetadata).length,
    };
  }

  getMetadata(filename: string) {
    return this.fileMetadata[filename];
  }

  updateMetadata(
    filename: string,
    metadata: { description: string; content: string; postTime: string },
  ) {
    if (this.fileMetadata[filename]) {
      this.fileMetadata[filename] = {
        ...this.fileMetadata[filename],
        ...metadata,
      };
    }
  }

  deleteFile(filename: string) {
    delete this.fileMetadata[filename];
  }
}
