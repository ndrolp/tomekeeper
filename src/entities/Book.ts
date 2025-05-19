import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}

export interface IBook {
  id: number;
  title: string;
  author?: string;
  genre?: string;
  publicationYear?: number;
  description?: string;
}
