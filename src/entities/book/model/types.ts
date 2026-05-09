export interface Book {
  id: string;
  title: string;
  author: string;
  year?: number;
  subjects?: string[];
  coverId?: number;
  isbn?: string;
  olid?: string;
  oclc?: string;
  lccn?: string;
  editionCount: number;
}
