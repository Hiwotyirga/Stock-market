import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;
  
  @Column()
  email: string;

  @Column({ type: 'varchar', nullable: true, default: 'Admin'})
  role: string;

  // @OneToOne(() => Profile, (profile) => profile.user)
  // profile: Profile;
}