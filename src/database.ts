import "reflect-metadata";
import { DataSource } from "typeorm";
import { CONFIG } from "./config";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: CONFIG.database.host,
    port: CONFIG.database.port,
    username: CONFIG.database.user,
    password: CONFIG.database.password,
    database: CONFIG.database.databaseName,
    synchronize: true,
    logging: false,
    entities: [],
});
