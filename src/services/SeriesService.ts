import { AppDataSource } from "../database";
import { ISerie, Serie } from "../entities/Serie";

export class SeriesService {
  static async createSeries(newSeriesData: ISerie): Promise<Serie> {
    const seriesRepo = AppDataSource.getRepository(Serie);
    const newSeries = seriesRepo.create(newSeriesData);
    const series = await seriesRepo.save(newSeries);
    return series;
  }
}
