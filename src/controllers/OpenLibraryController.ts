import { Controller, Route } from "ndro-express-utils";
import { Request, Response } from "express";
import { OpenLibraryService } from "../services/OpenLibraryService";

@Controller("/openlibrary")
export class OpenLibraryController {
  @Route("get", "/searchbook")
  async searchBook(req: Request, res: Response) {
    const { title } = req.query as { title: string };
    const data = await OpenLibraryService.searchBook(title);
    return res.json(data);
  }
  @Route("get", "/keydetails")
  async getKeyDetails(req: Request, res: Response) {
    const { key } = req.query as { key: string };
    const data = await OpenLibraryService.getKeyDetais(key);
    console.log({ key });
    return res.json(data);
  }
}
