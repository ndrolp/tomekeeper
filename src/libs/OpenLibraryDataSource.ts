import axios from "axios";

export const openApi = axios.create({
  baseURL: `http://openlibrary.org`,
  headers: {
    "User-Agent": "Tomekeeper ndro.lozano@gmail.com",
  },
});

export class OpenLibraryDataSource {
  static async searchBooksByTitle({
    name,
    lang = "en",
  }: {
    name: string;
    lang?: string;
  }) {
    const data = await openApi.get(`/search.json?q=${name}&lang=${lang}`);
    return data.data;
  }
  static async getWorkDetails(key: string) {
    const data = await openApi.get(`/works/${key}.json?lang=es`);
    return data.data;
  }
}
