import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  USE_WARDEN: process.env.USE_WARDEN === "true",
  JWT_SECRET: process.env.JWT_SECRET || "default_secret",
  PORT: process.env.PORT || 4000,

  warden: {
    baseUrl: process.env.WARDEN_BASE_URL || "http://localhost:3000",
  },

  media: {
    uploadFolder: "/upload",
  },

  database: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "password",
    databaseName: process.env.DB_NAME || "tomekeeper",
  },
};
