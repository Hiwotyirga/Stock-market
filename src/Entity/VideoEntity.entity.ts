import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('videos')
export class VideoEntity {
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

  @Column()
  postTime: Date;
}
