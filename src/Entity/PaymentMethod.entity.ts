// src/stocks/entities/PaymentMethod.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Subscribe } from './Subscribe.enetity';


@Entity('PaymentMethod') // Keep the name consistent with your database table
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  Method: string;

  @OneToMany(() => Subscribe, (subscribe) => subscribe.paymentMethod) // Updated the reference
  subscribers: Subscribe[]; // Use a more intuitive name
}
