import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Pokemon } from "./knight";

@Entity("abilities")
export class Ability {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ type: "text", nullable: true })
  description!: string;

  // Relación muchos a muchos con Pokémon
  @ManyToMany(() => Pokemon, (pokemon) => pokemon.abilities)
  pokemons!: Pokemon[];
}
