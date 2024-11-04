import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'trades' })
export class Trade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.trades, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  quantity: number;

  @Column()
  transactionType: 'buy' | 'sell';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  transactionDate: Date;

  @Column({ default: 'pending' }) // or 'completed', 'failed', etc.
  status: string;
}
