export interface Book {
  id: string;
  title: string;
  author: string;
  authorKeys?: string[];
  year?: number;
  coverId?: number;
}

export interface WorkApiResponse {
  title: string;
  description?: string | { type: string; value: string };
  subjects?: string[];
  covers?: number[];
  authors?: { author: { key: string } }[];
}

export interface AuthorApiResponse {
  key: string;
  name: string;
  birth_date?: string;
  photos?: number[];
}

export interface EditionApiResponse {
  title?: string;
  works?: { key: string }[];
  covers?: number[];
  by_statement?: string;
  subjects?: string[];
  authors?: { key: string }[];
}

export interface BookDetails {
  title: string;
  description?: string;
  subjects?: string[];
  coverId?: number;
  authors: {
    name: string;
    birthDate?: string;
    photoId?: number;
    isContributor?: boolean;
  }[];
}
