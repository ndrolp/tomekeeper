import "reflect-metadata";
import { DataSource } from "typeorm";
import { CONFIG } from "./config";
import { Book } from "./entities/Book";
import { Edition } from "./entities/Edition";
import { Serie } from "./entities/Serie";
import { BookHeaderView } from "./entities/BookHeaderView";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: CONFIG.database.host,
  port: CONFIG.database.port,
  username: CONFIG.database.user,
  password: CONFIG.database.password,
  database: CONFIG.database.databaseName,
  synchronize: true,
  logging: false,
  entities: [Book, BookHeaderView, Edition, Serie],
});
