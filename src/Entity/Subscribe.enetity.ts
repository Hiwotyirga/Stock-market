// src/stocks/entities/Subscribe.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PaymentMethod } from './PaymentMethod.entity';

@Entity('subscribers') // Correctly named to represent subscriptions
export class Subscribe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.subscribers) // Correct reference
  @JoinColumn({ name: 'PaymentId' }) // This should match the column in PaymentMethod
  paymentMethod: PaymentMethod; // Clear naming
}
