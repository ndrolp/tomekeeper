import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";

@Entity()
export class Quote{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    character?: string

    @Column()
    text: string

    @Column({nullable: true})
    comment?: string

    @ManyToOne(() => Book, book => book.quotes)
    book: Book
}

export interface IQuote{
    id?: number,
    character?: string,
    text: string,
    comment?: string
    bookId: number
}
