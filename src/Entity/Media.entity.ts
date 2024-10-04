import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Watchlist } from './WatchlistItem.entity';

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
  mimetype: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  postTime: Date;

  @OneToMany(() => Watchlist, (watchlist) => watchlist.media)
  watchlist: Watchlist[];
}
