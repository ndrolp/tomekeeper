import { Controller, Route } from "ndro-express-utils";
import { type Request, type Response } from "express";
import { uploadCover } from "../libs/media";

interface MulterRequest extends Request {
  file: Express.Multer.File;
}

type FileHack = {
  filename: string;
  originalname: string;
  path: string;
};

@Controller("/media")
export class MediaController {
  @Route("post", "/covers/upload", uploadCover.single("cover"))
  uploadMedia(req: Request, res: Response) {
    const file = (req as MulterRequest).file as FileHack;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    res.json({
      originalName: file.originalname,
      filePath: file.path,
      url: `/uploads/${req.query.subfolder}/${file.filename}`,
    });
  }
}
