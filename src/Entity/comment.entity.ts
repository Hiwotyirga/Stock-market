import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MediaEntity } from './Media.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => MediaEntity, (media) => media.comments)
  media: MediaEntity;
}
