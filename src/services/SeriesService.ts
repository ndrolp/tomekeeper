import { FindOptionsWhere, Like } from "typeorm";
import { AppDataSource } from "../database";
import { ISerie, Serie } from "../entities/Serie";

export class SeriesService {
  static async createSeries(newSeriesData: ISerie): Promise<Serie> {
    const seriesRepo = AppDataSource.getRepository(Serie);
    const newSeries = seriesRepo.create(newSeriesData);
    const series = await seriesRepo.save(newSeries);
    return series;
  }

  static async fetchSeries(title: string = ""): Promise<Serie[]> {
    const seriesRepo = AppDataSource.getRepository(Serie);

    const filter: FindOptionsWhere<Serie> = {};

    filter.name = Like(`%${title}%`);

    const data = await seriesRepo.findBy(filter);
    return data;
  }

  static async getSeriesById(id: number): Promise<Serie | null> {
    const seriesRepo = AppDataSource.getRepository(Serie);

    const series = await seriesRepo.findOneBy({ id: id });
    return series;
  }
}
