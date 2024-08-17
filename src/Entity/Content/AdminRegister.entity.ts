// import { join } from 'path';
// import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

// @Entity()
// export class AdminRegister{
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   name: string;

//   @Column()
//   email: string;

//   @Column()
//   password: string;
// // 
//   @Column({ default: true })
//   isActive: boolean;
//   @ManyToMany(()=>Role ,(role)=>role.adminRegister,{eager:true})
//   @JoinTable()
//   roles:Role[]
// }
