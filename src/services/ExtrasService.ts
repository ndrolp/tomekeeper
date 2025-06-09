import { AppDataSource } from "../database";
import { Book } from "../entities/Book";

export class ExtrasService {
  static async getCounts() {
    const booksRepository = AppDataSource.getRepository(Book);

    return {
      books: await booksRepository.count(),
    };
  }
}
