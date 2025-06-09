import { Controller, Route } from "ndro-express-utils";
import { Request, Response } from "express";
import { ExtrasService } from "../services/ExtrasService";

@Controller("/extras")
export class ExtrasController {
  @Route("get", "/counts")
  async getCounts(_: Request, res: Response) {
    const data = await ExtrasService.getCounts();

    return res.json(data);
  }
}
