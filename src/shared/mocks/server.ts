import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { OPEN_LIBRARY_BASE_URL } from '@/shared/config/openLibraryApi';
import type {
  WorkApiResponse,
  EditionApiResponse,
  AuthorApiResponse,
} from '@/entities/book/model/types';

const workMock: WorkApiResponse = {
  title: 'Clean Code',
  description: {
    type: '/type/text',
    value: 'A handbook of agile software.',
  },
  subjects: ['Programming', 'Software', 'Engineering', 'Testing', 'Design'],
  covers: [42],
  authors: [{ author: { key: '/authors/OL1A' } }],
};

const editionMock: EditionApiResponse = {
  title: 'Clean Code Edition',
  works: [{ key: '/works/OL1W' }],
  covers: [55],
  by_statement: 'Robert C. Martin',
  subjects: ['Programming', 'Software'],
  authors: [{ key: '/authors/OL1A' }],
};

const authorMock: AuthorApiResponse = {
  key: '/authors/OL1A',
  name: 'Robert C. Martin',
  birth_date: '1952-12-05',
  photos: [99],
};

export const handlers = [
  http.get(`${OPEN_LIBRARY_BASE_URL}/works/{id}.json`, () => {
    return HttpResponse.json(workMock);
  }),

  http.get(`${OPEN_LIBRARY_BASE_URL}/books/:id.json`, () => {
    return HttpResponse.json(editionMock);
  }),

  http.get(`${OPEN_LIBRARY_BASE_URL}/authors/:id.json`, () => {
    return HttpResponse.json(authorMock);
  }),
];

export const server = setupServer(...handlers);
