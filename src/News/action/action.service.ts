import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/Entity/comment.entity';
import { MediaEntity } from 'src/Entity/Media.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(MediaEntity) private mediaRepo: Repository<MediaEntity>,
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  async likeMedia(id: string): Promise<MediaEntity> {
    const media = await this.mediaRepo.findOneBy({ id });
    if (!media) throw new Error('Media not found');
    media.likes += 1;
    return this.mediaRepo.save(media);
  }

  async dislikeMedia(id: string): Promise<MediaEntity> {
    const media = await this.mediaRepo.findOneBy({ id });
    if (!media) throw new Error('Media not found');
    media.dislikes += 1;
    return this.mediaRepo.save(media);
  }

  async addComment(id: string, text: string): Promise<Comment> {
    const media = await this.mediaRepo.findOneBy({ id });
    if (!media) throw new Error('Media not found');
    
    const comment = new Comment();
    comment.text = text;
    comment.media = media;
    
    return this.commentRepo.save(comment);
  }

  async getComments(id: string): Promise<Comment[]> {
    return this.commentRepo.find({
      where: { media: { id } },
      relations: ['media'], // Include media relation for the comments
    });
  }
}
