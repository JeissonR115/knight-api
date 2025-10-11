import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BaseEntity,
} from "typeorm";
import { Pokemon } from "./Pokemon";

@Entity()
export class Stat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;
  @Column({ type: "int" })
  baseValue!: number;

  @ManyToMany(() => Pokemon, (pokemon) => pokemon.stats)
  pokemons!: Pokemon[];
}
