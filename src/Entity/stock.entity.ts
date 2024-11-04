// src/stocks/entities/stock.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stocks')
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticker: string;

  @Column('decimal')
  price: number;

  @Column('timestamp')
  timestamp: Date;

  // Add more fields as necessary
}
