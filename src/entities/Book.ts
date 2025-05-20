import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Edition } from "./Edition";
import { Serie } from "./Serie";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  author?: string;

  @Column({ nullable: true })
  genre?: string;

  @Column({ nullable: true })
  publicationYear?: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  language?: string;

  @ManyToOne(() => Serie, (serie) => serie.books, { nullable: true })
  serie?: Serie;

  @Column({ nullable: true })
  seriesOrder?: number;

  @OneToMany(() => Edition, (edition) => edition.book)
  editions: Edition[];
}

export interface IBook {
  id: number;
  title: string;
  author?: string;
  genre?: string;
  publicationYear?: number;
  description?: string;
}
