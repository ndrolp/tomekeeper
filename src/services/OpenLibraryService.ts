import { OpenLibraryDataSource } from "../libs/OpenLibraryDataSource";

export class OpenLibraryService {
  static async searchBook(title: string) {
    return OpenLibraryDataSource.searchBooksByTitle({ name: title });
  }

  static async getKeyDetais(key: string) {
    return OpenLibraryDataSource.getWorkDetails(key);
  }
}
