import {
  Equal,
  FindOptionsOrder,
  FindOptionsWhere,
  DeleteResult,
  ILike,
  Like,
} from "typeorm";
import { AppDataSource } from "../database";
import { Book, IBook } from "../entities/Book";
import { ISerie } from "../entities/Serie";
import { SeriesService } from "./SeriesService";
import { BookHeaderView } from "../entities/BookHeaderView";

export type GetBooksSortOptions = "title" | "author" | "series";

export class BooksService {
  static async createBook(newBook: IBook): Promise<Book> {
    const newBookData: IBook = {
      title: newBook.title,
      author: newBook.author,
      description: newBook.description,
      genre: newBook.genre,
      publicationYear: newBook.publicationYear,
      externalCoverUrl: newBook.externalCoverUrl,
      seriesOrder:
        newBook.seriesOrder === 0 ? 0 : newBook.seriesOrder || undefined,
      language: newBook.language,
    };

    if (
      !newBook.serie?.id &&
      newBook?.serie?.name &&
      newBookData.serie?.name !== ""
    ) {
      console.warn("SERIES FOUND");
      const newSeriesData: ISerie = {
        name: newBook.serie.name,
        description: newBook.serie.description,
      };

      const newSeries = await SeriesService.createSeries(newSeriesData);
      newBookData.serie = newSeries;
    }

    const bookRepository = AppDataSource.getRepository(Book);
    const book = bookRepository.create(newBookData);

    if (newBook?.serie?.id) {
      const seriesToBind = await SeriesService.getSeriesById(newBook.serie.id);
      if (!seriesToBind) throw new Error("Series Provided Not found");
      book.serie = seriesToBind;
    }
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

    const data = await bookRepository.findBy(filters);
    return data;
  }

  static async getBookById(
    id: number | string,
  ): Promise<Book | undefined | null> {
    const repo = AppDataSource.getRepository(Book);
    const book = await repo.findOneBy({ id: parseInt(id.toString()) });
    return book;
  }

  static async filterHeader(options: {
    query?: string;
    sort?: GetBooksSortOptions;
  }): Promise<BookHeaderView[]> {
    const { query, sort } = options;
    const repository = AppDataSource.getRepository(BookHeaderView);

    const where = query
      ? [
          { title: ILike(`%${query}%`) },
          { author: ILike(`%${query}%`) },
          { series: ILike(`%${query}%`) },
        ]
      : undefined;

    const validSortFields: GetBooksSortOptions[] = [
      "title",
      "author",
      "series",
    ];
    const order: FindOptionsOrder<BookHeaderView> =
      sort && validSortFields.includes(sort)
        ? { [sort]: "ASC" as const }
        : { title: "ASC" as const };

    if (sort === "series") {
      order.seriesOrder = "ASC";
    }

    return await repository.find({
      where,
      order,
    });
  }

  static async getFilters() {
    const bookRepo = AppDataSource.getRepository(Book);

    const genresRaw: { genre: string }[] = await bookRepo
      .createQueryBuilder("book")
      .select("DISTINCT book.genre")
      .getRawMany();

    const authorsRaw: { author: string }[] = await bookRepo
      .createQueryBuilder("book")
      .select("DISTINCT book.author")
      .getRawMany();

    const genres = Array.from(
      new Set(genresRaw.flatMap((item) => item.genre.split(", "))),
    );

    const authors = Array.from(new Set(authorsRaw.map((item) => item.author)));

    return { genres, authors };
  }

  static async deleteBook(bookID: number): Promise<DeleteResult> {
    const bookRepo = AppDataSource.getRepository(Book);
    const removed = await bookRepo.delete(bookID);
    return removed;
  }
}
