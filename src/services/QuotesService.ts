import { AppDataSource } from "../database";
import { Book } from "../entities/Book";
import { IQuote, Quote } from "../entities/Quote";

export class QuotesService{
    static async createQuote(quote: IQuote): Promise<Quote>{
        const quotesRepo = AppDataSource.getRepository(Quote)

        const book = await AppDataSource.getRepository(Book).findOneByOrFail({id: quote.bookId})

        if(!book) {
            throw new Error("The book id was not found")
        }

        const newQuote = new Quote()

        newQuote.text = quote.text
        newQuote.character = quote.character || undefined
        newQuote.comment = quote.comment || undefined
        newQuote.book = book

        await quotesRepo.save(newQuote)

        return newQuote
    }
}
