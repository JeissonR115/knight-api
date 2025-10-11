import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Type } from "./Type";
import { Ability } from "./Ability";
import { Stat } from "./Stat";

@Entity("pokemons")
export class Pokemon {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  height!: number;

  @Column()
  weight!: number;

  @ManyToMany(() => Type, (type) => type.pokemons)
  @JoinTable({ name: "pokemon_types" })
  types!: Type[];

  @ManyToMany(() => Ability, (ability) => ability.pokemons)
  @JoinTable({ name: "pokemon_abilities" })
  abilities!: Ability[];

  @ManyToMany(() => Stat, (stat) => stat.pokemons, { cascade: true })
  @JoinTable({ name: "pokemon_stats" })
  stats!: Stat[];
}
