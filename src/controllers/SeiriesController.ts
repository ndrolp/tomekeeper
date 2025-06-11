import { Controller, Route } from "ndro-express-utils";
import { Request, Response } from "express";
import { SeriesService } from "../services/SeriesService";

@Controller("/series")
export class SeriesController {
  @Route("get", "/")
  async getSeries(req: Request, res: Response) {
    const { title } = req.query as { title?: string };

    const filteredSeries = await SeriesService.fetchSeries(title ?? "");

    return res.json(filteredSeries);
  }
}
