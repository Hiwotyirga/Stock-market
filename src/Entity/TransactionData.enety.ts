import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'transactions' })
export class TransactionData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.transactions, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  quantity: number;

  @Column()
  fullName: string;

  @Column()
  email: string;
  @Column()
  transactionType: string;

}
