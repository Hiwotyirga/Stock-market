import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  stockSymbol: string;

  @Column()
  author: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  imageUrl: string;  // New field for the image URL
}
