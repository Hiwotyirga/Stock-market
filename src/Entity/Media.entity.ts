import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('media')
export class MediaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column({ length: 10000 })
  description: string;

  @Column()
  content: string;

  @Column()
  mimetype: string; // To store MIME type (e.g., 'image/jpeg', 'video/mp4')

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  postTime: Date;
}
