import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { MediaEntity } from './Media.entity';

@Entity('watchlist')
export class Watchlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.watchlist)
  user: User;

  @ManyToOne(() => MediaEntity, (media) => media.watchlist, { eager: true })
  @JoinColumn({ name: 'mediaId' })
  media: MediaEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  addedAt: Date;
}
