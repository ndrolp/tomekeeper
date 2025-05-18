import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { defineRoutes } from "ndro-express-utils";
import { Router } from "express";
import AuthController from "./controllers/AuthController";
import { CONFIG } from "./config";

dotenv.config();
const app = express();

app.use(express.json());

defineRoutes([AuthController], app, true);

app.listen(CONFIG.PORT, () => {
    console.log(`Library service running on port ${CONFIG.PORT}`);
});

const router = Router();

router.get("/", (_, res) => {
    res.json({ message: "Library service is up and running." });
});

export default router;
