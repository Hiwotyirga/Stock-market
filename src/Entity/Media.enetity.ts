import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('media')
export class MediaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @Column({type: 'varchar', length: 10000 })
  description: string;

  @Column()
  content: string;

  @CreateDateColumn()
  postTime: Date;
}
