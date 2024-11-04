import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { PriceHistory } from './PriceHistory.entity';

@Entity('top_gainers')
export class TopGainer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ticker: string;

  @Column('decimal') 
  price: number;

  @Column('decimal')
  change_amount: number;

  @Column('decimal')
  change_percentage: number;

  @Column('bigint')
  volume: number;

  // @OneToMany(() => PriceHistory, (priceHistory) => priceHistory.stockGainer)
  // priceHistory: PriceHistory[];
}