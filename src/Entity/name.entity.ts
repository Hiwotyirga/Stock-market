import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('name')
export class Nameentitiy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false }) // Ensure this field is not nullable
  name: string;
}
