import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Trade } from './trade.entity';

@Entity('stock_data')
export class StockDataList extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  lastUpdated: Date;

  @Column('json', { nullable: true })
  top_gainers: Array<{
    ticker: string;
    price: string;
    change_amount: string;
    change_percentage: string;
    volume: string;
  }>;

  @Column('json', { nullable: true })
  top_losers: Array<{
    ticker: string;
    price: string;
    change_amount: string;
    change_percentage: string;
    volume: string;
  }>;

  @Column('json', { nullable: true })
  most_actively_traded: Array<{
    ticker: string;
    price: string;
    change_amount: string;
    change_percentage: string;
    volume: string;
  }>;
  @OneToMany(() => Trade, (trade) => trade.stock)
  trades: Trade[];
}
