import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Trade } from './trade.entity';
import { TransactionData } from './TransactionData.enety';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', default: 'User' })
  role: string;

  @OneToMany(() => Trade, (trade) => trade.user)
  trades: Trade[];

  @OneToMany(() => TransactionData, (transaction) => transaction.user)
  transactions: TransactionData[];
}
