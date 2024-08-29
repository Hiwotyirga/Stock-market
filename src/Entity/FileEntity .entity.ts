import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @Column({type: 'varchar', length: 10000 })
  describe: string;

  @Column()
  content: string;

  @Column()
  postTime: Date;
}
