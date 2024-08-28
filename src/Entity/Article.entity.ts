// src/entities/article.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isPublished: boolean;

  @Column()
  author: string;
}
