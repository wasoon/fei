import {
  BookActionType,
  AddBookAction,
  UpdateBookAction,
  DeleteBookAction,
  DeleteSelectedBooksAction,
  SetSelectedBooksAction,
  SortBooksAction,
  Book,
} from './types';
import { logger } from '@/lib/logger';

/**
 * 添加书籍
 * @param book 书籍对象
 * @returns Action
 */
export const addBook = (book: Book): AddBookAction => {
  logger.info('添加书籍', book);
  return {
    type: BookActionType.ADD_BOOK,
    payload: book,
  };
};

/**
 * 更新书籍
 * @param book 书籍对象
 * @returns Action
 */
export const updateBook = (book: Book): UpdateBookAction => {
  logger.info('更新书籍', book);
  return {
    type: BookActionType.UPDATE_BOOK,
    payload: book,
  };
};

/**
 * 删除书籍
 * @param id 书籍ID
 * @returns Action
 */
export const deleteBook = (id: string): DeleteBookAction => {
  logger.info('删除书籍', { id });
  return {
    type: BookActionType.DELETE_BOOK,
    payload: id,
  };
};

/**
 * 删除选中的书籍
 * @returns Action
 */
export const deleteSelectedBooks = (): DeleteSelectedBooksAction => {
  logger.info('删除选中的书籍');
  return {
    type: BookActionType.DELETE_SELECTED_BOOKS,
  };
};

/**
 * 设置选中的书籍
 * @param bookIds 书籍ID数组
 * @returns Action
 */
export const setSelectedBooks = (bookIds: string[]): SetSelectedBooksAction => {
  logger.info('设置选中的书籍', { bookIds });
  return {
    type: BookActionType.SET_SELECTED_BOOKS,
    payload: bookIds,
  };
};

/**
 * 排序书籍
 * @param sortBy 排序字段
 * @returns Action
 */
export const sortBooks = (sortBy: keyof Book | 'price'): SortBooksAction => {
  logger.info('排序书籍', { sortBy });
  return {
    type: BookActionType.SORT_BOOKS,
    payload: sortBy,
  };
};