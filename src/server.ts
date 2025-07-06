import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { defineRoutes } from "ndro-express-utils";
import { Router } from "express";
import AuthController from "./controllers/AuthController";
import { CONFIG } from "./config";
import { AppDataSource } from "./database";
import { BooksController } from "./controllers/BooksController";
import cors from "cors";
import { MediaController } from "./controllers/Media";
import { ExtrasController } from "./controllers/ExtrasController";
import { SeriesController } from "./controllers/SeiriesController";
import { QuotesController } from "./controllers/QuoteController";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

defineRoutes(
  [
    AuthController,
    BooksController,
    MediaController,
    ExtrasController,
    SeriesController,
    QuotesController
  ],
  app,
  true
);

const router = Router();

router.get("/", (_, res) => {
  res.json({ message: "Library service is up and running." });
});

app.use("/static", express.static("/upload"));

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
