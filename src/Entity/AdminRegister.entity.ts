import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from './Role.entity';

@Entity('admins')
export class AdminRegister {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Changed to string

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Role, (role) => role.adminRegisters, { eager: true })
  @JoinTable() // Use JoinTable only in ManyToMany relationships
  roles: Role[];
}
