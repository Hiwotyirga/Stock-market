import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity('stock')
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar'})
  weight: string;

  @Column({ type: 'varchar'})
  description: string;
  
  @Column()
  symbol: string;


}