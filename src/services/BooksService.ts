import { AppDataSource } from "../database";
import { Book, IBook } from "../entities/Book";

export class BooksService {
  static async createBook(newBook: IBook): Promise<Book> {
    const bookRepository = AppDataSource.getRepository(Book);
    const book = bookRepository.create(newBook);
    await bookRepository.save(book);
    return book;
  }
}
