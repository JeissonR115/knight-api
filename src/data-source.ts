import "reflect-metadata";
import { DataSource } from "typeorm";
import { Pokemon } from "./models/Pokemon";
import { Type } from "./models/Type";
import { Ability } from "./models/Ability";
import { Stat } from "./models/Stat";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "pokemon_db",
  synchronize: true,
  logging: true,
  entities: [Pokemon, Type, Ability, Stat],
});
