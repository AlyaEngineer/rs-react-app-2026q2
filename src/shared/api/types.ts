export interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  author_key?: string[];
  first_publish_year?: number;
  subject?: string[];
  cover_i?: number;
  edition_key?: string[];
}

export interface OpenLibraryResponse {
  numFound: number;
  docs: OpenLibraryDoc[];
}

export interface OpenLibraryError {
  detail?: {
    msg?: string;
  }[];
}
