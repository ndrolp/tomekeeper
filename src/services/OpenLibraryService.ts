import { OpenLibraryDataSource } from "../libs/OpenLibraryDataSource";

export class OpenLibraryService {
  static async searchBook(title: string) {
    return OpenLibraryDataSource.searchBooksByTitle({ name: title });
  }
}
