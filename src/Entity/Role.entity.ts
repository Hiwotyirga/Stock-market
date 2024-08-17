import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
// import { Admin } from './AdminRegister.entity';
import { AdminRegister } from './AdminRegister.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => AdminRegister, (admin) => admin.roles)
  adminRegister: AdminRegister[];

}
