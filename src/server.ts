import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { defineRoutes } from "ndro-express-utils";
import { Router } from "express";
import AuthController from "./controllers/AuthController";
import { CONFIG } from "./config";
import { AppDataSource } from "./database";
import { BooksController } from "./controllers/BooksController";

dotenv.config();
const app = express();

app.use(express.json());

defineRoutes([AuthController, BooksController], app, true);

const router = Router();

router.get("/", (_, res) => {
  res.json({ message: "Library service is up and running." });
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected.");
    app.listen(CONFIG.PORT, () => {
      console.log(`Library service running on port ${CONFIG.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

export default router;
