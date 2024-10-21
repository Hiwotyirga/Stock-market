import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OneToMany } from 'typeorm';
import { Comment } from './comment.entity';

@Entity('media')
export class MediaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  mimetype: string;

  @Column({ nullable: true })
  externalLink: string;

  @Column({ nullable: true, default: 0 })
  likes: number;

  @Column({ nullable: true, default: 0 })
  dislikes: number;

  @OneToMany(() => Comment, (comment) => comment.media)
  comments: Comment[];
}
