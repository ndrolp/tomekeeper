import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Book } from "./Book";

export enum EditionFormat {
  HARDCOVER = "Hardcover",
  PAPERBACK = "Paperback",
  EBOOK = "Ebook",
  AUDIOBOOK = "Audiobook",
  PDF = "PDF",
  EPUB = "EPUB",
  MOBI = "MOBI",
}

@Entity()
export class Edition {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "enum",
    enum: EditionFormat,
    nullable: true,
  })
  format!: EditionFormat;

  @Column({ nullable: true })
  publisher!: string;

  @Column({ nullable: true })
  isbn!: string;

  @Column({ nullable: true, type: "date" })
  publicationDate!: string;

  @ManyToOne(() => Book, (book) => book.editions)
  book: Book;
}
