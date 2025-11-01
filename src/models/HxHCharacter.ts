// entities/HxHCharacter.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("hxh_characters")
export default class HxHCharacter {
  @PrimaryGeneratedColumn()
  id!: number;  

  @Column({ unique: true })
  name!: string;  

  @Column()
  age!: number;  

  @Column()
  height!: number;  

  @Column()
  weight!: number;  

  @Column()
  img!: string;  

  @CreateDateColumn()
  created_at!: Date;  

  @UpdateDateColumn()
  updated_at!: Date;  
}