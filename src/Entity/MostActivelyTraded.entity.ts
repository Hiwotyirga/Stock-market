// src/entity/MostActivelyTraded.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { PriceHistory } from './PriceHistory.entity';

@Entity('most_actively_traded')
export class MostActivelyTraded {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ticker: string;

  @Column('decimal') // Use decimal for financial values
  price: number;

  @Column('decimal')
  change_amount: number;

  @Column('decimal')
  change_percentage: number;

  @Column('bigint') // Assuming volume can be large
  volume: number;

  // @OneToMany(() => PriceHistory, (priceHistory) => priceHistory.stockActive) // Corrected here
  // priceHistory: PriceHistory[];
}
