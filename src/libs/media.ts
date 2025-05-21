import multer from "multer";
import path from "path";
import fs from "fs";
import { CONFIG } from "../config";

const BASE_UPLOAD_PATH = CONFIG.media.uploadFolder;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subfolder = req.query.subfolder || "generic"; // e.g., ?subfolder=covers
    const fullPath = path.join(BASE_UPLOAD_PATH, subfolder.toString());

    // Ensure directory exists
    fs.mkdirSync(fullPath, { recursive: true });

    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const coversStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subfolder = "covers"; // e.g., ?subfolder=covers
    const fullPath = path.join(BASE_UPLOAD_PATH, subfolder.toString());

    // Ensure directory exists
    fs.mkdirSync(fullPath, { recursive: true });

    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });
export const uploadCover = multer({ storage: coversStorage });
