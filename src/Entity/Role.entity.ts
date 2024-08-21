import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { AdminRegister } from './AdminRegister.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Changed to string

  @Column()
  name: string;
}
