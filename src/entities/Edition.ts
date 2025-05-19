import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Book } from "./Book";

@Entity()
export class Edition {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  format!: string;

  @Column({ nullable: true })
  publisher!: string;

  @Column({ nullable: true })
  isbn!: string;

  @Column({ nullable: true, type: "date" })
  publicationDate!: string;

  @OneToOne(() => Book)
  @JoinColumn()
  book!: Book;
}
