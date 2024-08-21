import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

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
}
