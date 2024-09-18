import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('stock_data')
export class StockDataList extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  lastUpdated: Date;

  @Column('json', { nullable: true })
  topGainers: {
    ticker: string;
    price: string;
    changeAmount: string;
    changePercentage: string;
    volume: string;
  }[];

  @Column('json', { nullable: true })
  topLosers: {
    ticker: string;
    price: string;
    changeAmount: string;
    changePercentage: string;
    volume: string;
  }[];

  @Column('json', { nullable: true })
  mostActivelyTraded: {
    ticker: string;
    price: string;
    changeAmount: string;
    changePercentage: string;
    volume: string;
  }[];
}
