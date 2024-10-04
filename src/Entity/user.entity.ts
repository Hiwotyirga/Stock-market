import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Watchlist } from './WatchlistItem.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column()
  email: string;

  @Column({ type: 'varchar', nullable: true, default: 'User' })
  role: string;

  @OneToMany(() => Watchlist, (watchlist) => watchlist.user)
  watchlist: Watchlist[];
}
