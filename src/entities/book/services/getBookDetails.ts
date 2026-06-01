import { isEditionId } from '@/entities/book/api/helpers';
import { getEditionDetails } from './getEditionDetails';
import { getWorkDetails } from './getWorkDetails';
import type { GetBookDetailsArg } from '@/entities/book/api/bookApi';

export function getBookDetails(args: GetBookDetailsArg) {
  return isEditionId(args.id) ? getEditionDetails(args) : getWorkDetails(args);
}
