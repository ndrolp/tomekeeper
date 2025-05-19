import { Request, Response } from "express";
import { Controller, Route, Validate } from "ndro-express-utils";
import { BookCreationSchema } from "../validation/BooksValidationSchemas";
import { IBook } from "../entities/Book";
import { BooksService } from "../services/BooksService";

@Controller("/books")
export class BooksController {
  @Route("post", "/")
  @Validate(BookCreationSchema)
  async createBook(req: Request<object, object, IBook>, res: Response) {
    const newBookData = req.body;
    const newBook = await BooksService.createBook(newBookData);
    return res.status(201).json(newBook);
  }
}
