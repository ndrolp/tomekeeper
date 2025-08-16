import { DataSource, ViewColumn, ViewEntity } from "typeorm";
import { Book } from "./Book";
import { Serie } from "./Serie";

@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .select("book.id", "id")
      .addSelect("book.title", "title")
      .addSelect("book.externalCoverUrl", "externalCoverUrl")
      .addSelect("book.author", "author")
      .addSelect("book.publicationYear", "publicationYear")
      .addSelect("book.seriesOrder", "seriesOrder")
      .addSelect("serie.name", "series")
      .from(Book, "book")
      .leftJoin(Serie, "serie", "serie.id = book.serieId");
  },
})
export class BookHeaderView {
  @ViewColumn()
  id: number;
  @ViewColumn()
  title: string;
  @ViewColumn()
  author: string;
  @ViewColumn()
  publicationYear: number;
  @ViewColumn()
  seriesOrder: number;
  @ViewColumn()
  series: string;
  @ViewColumn()
  externalCoverUrl: string;
}
