import { Equal, FindOptionsWhere, Like } from "typeorm";
import { AppDataSource } from "../database";
import { Book, IBook } from "../entities/Book";
import { ISerie } from "../entities/Serie";
import { SeriesService } from "./SeriesService";
import { BookHeaderView } from "../entities/BookHeaderView";

export class BooksService {
  static async createBook(newBook: IBook): Promise<Book> {
    const newBookData: IBook = {
      title: newBook.title,
      author: newBook.author,
      description: newBook.description,
      genre: newBook.genre,
      publicationYear: newBook.publicationYear,
      seriesOrder: newBook.seriesOrder,
    };

    if (newBook.serie) {
      const newSeriesData: ISerie = {
        name: newBook.serie.name,
        description: newBook.serie.description,
      };

      const newSeries = await SeriesService.createSeries(newSeriesData);
      newBookData.serie = newSeries;
    }

    const bookRepository = AppDataSource.getRepository(Book);
    const book = bookRepository.create(newBookData);
    await bookRepository.save(book);
    return book;
  }

  static async filter(filter: IBook): Promise<Book[]> {
    const bookRepository = AppDataSource.getRepository(Book);

    const filters: FindOptionsWhere<Book> = {};

    if (filter.author) filters.author = Like(`%${filter.author}%`);
    if (filter.title) filters.author = Like(`%${filter.author}%`);
    if (filter.id) filters.id = Equal(filter.id);
    if (filter.publicationYear)
      filters.publicationYear = Equal(filter.publicationYear);

    const data = bookRepository.findBy(filters);
    return data;
  }

  static async filterHeader(): Promise<BookHeaderView[]> {
    const headersRepository = AppDataSource.getRepository(BookHeaderView);

    const data = await headersRepository.find();
    return data;
  }
}
