import { Role } from 'src/roles/roles.enum';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Profile } from './profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', default: 'User' }) // Default value for rolename
  rolename: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
}
