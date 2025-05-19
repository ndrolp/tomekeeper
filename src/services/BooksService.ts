import { Equal, FindOptionsWhere, Like } from "typeorm";
import { AppDataSource } from "../database";
import { Book, IBook } from "../entities/Book";

export class BooksService {
  static async createBook(newBook: IBook): Promise<Book> {
    const bookRepository = AppDataSource.getRepository(Book);
    const book = bookRepository.create(newBook);
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
}
