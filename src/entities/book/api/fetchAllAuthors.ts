import { type BookDetails } from '../model/types';
import { fetchAuthor } from './fetchAuthor';

export async function fetchAllAuthors(
  keys: string[]
): Promise<BookDetails['authors']> {
  const authors = await Promise.all(keys.map(fetchAuthor));
  const uniqueNames = new Set<string>();

  return authors.filter((author): author is NonNullable<typeof author> => {
    if (!author) return false;

    const name = author.name.toLowerCase();

    if (uniqueNames.has(name)) {
      return false;
    }

    uniqueNames.add(name);
    return true;
  });
}
