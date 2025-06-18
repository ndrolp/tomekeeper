import { Request, Response } from "express";
import { Controller, Route, Validate } from "ndro-express-utils";
import { BookCreationSchema } from "../validation/BooksValidationSchemas";
import { IBook } from "../entities/Book";
import { BooksService, GetBooksSortOptions } from "../services/BooksService";
import { uploadTemporal } from "../libs/media";
import EPub from "epub";
import fs from "fs/promises";

@Controller("/books")
export class BooksController {
  @Route("post", "/")
  @Validate(BookCreationSchema)
  async createBook(req: Request<object, object, IBook>, res: Response) {
    const newBookData = req.body;
    const newBook = await BooksService.createBook(newBookData);
    return res.status(201).json(newBook);
  }

  @Route("get", "/")
  async filterBooksHeaders(
    req: Request<object, object, object, IBook>,
    res: Response,
  ) {
    const { query, sort } = req.query as {
      query?: string;
      sort?: GetBooksSortOptions;
    };
    const filteredBooks = await BooksService.filterHeader({
      query,
      sort: sort ?? "title",
    });

    //await new Promise((resolve) => setTimeout(resolve, 1000));
    return res.json(filteredBooks);
  }

  @Route("get", "/:id")
  async getBookById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.json({ error: "Invalid request" }).status(400);
    const book = await BooksService.getBookById(id);
    if (!book)
      return res.status(404).json({ error: `Book with id: ${id} not found` });
    return res.json(book);
  }

  @Route("post", "/analyze", uploadTemporal.single("file"))
  async analyzeBook(req: Request, res: Response) {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const epubPath = req.file.path;

    try {
      const epub = new EPub(epubPath);

      epub.on("error", (err: Error) => {
        throw err;
      });

      epub.on("end", async () => {
        const metadata = {
          title: epub.metadata.title,
          author: epub.metadata.creator,
          language: epub.metadata.language,
          subject: epub.metadata.subject,
          description: epub.metadata.description,
          cover: null as string | null,
        };
        const extras = {
          manifest: epub.manifest,
          toc: epub.toc,
          meta: epub.metadata,
        };

        let coverImage = {
          img: null as string | null,
          mime: null as string | null,
        };

        const { cover } = epub.metadata as unknown as {
          cover: string | undefined | null;
        };

        coverImage = await new Promise((resolve, reject) => {
          epub.getImage(cover ?? "cover.jpg", (error, img, mimeType) => {
            if (error || !img || !mimeType) {
              return reject(error ?? new Error("Image or MIME type missing"));
            }

            resolve({
              img: img.toString("base64"),
              mime: mimeType,
            });
          });
        });

        await fs.unlink(epubPath); // delete the file after parsing
        res.json({ metadata, extras, coverImage });
      });

      epub.parse();
    } catch (error) {
      console.error(error);
      await fs.unlink(epubPath).catch(() => {}); // try to clean up
      return res.status(500).json({ error: "Failed to process EPUB file" });
    }
  }

  @Route("get", "/extras/filters")
  async getFilters(_: Request, res: Response) {
    const data = await BooksService.getFilters();
    return res.json(data);
  }
}
