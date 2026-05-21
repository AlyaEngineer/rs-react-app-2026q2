import { ITEMS_PER_PAGE } from '@/features/pagination/model/constants';

export const calculateTotalPages = (totalBooks: number) => {
  return Math.ceil(totalBooks / ITEMS_PER_PAGE);
};
