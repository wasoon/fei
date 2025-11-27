// 图书数据接口
export interface Book {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
}

// Action类型
export enum BookActionType {
  ADD_BOOK = 'ADD_BOOK',
  UPDATE_BOOK = 'UPDATE_BOOK',
  DELETE_BOOK = 'DELETE_BOOK',
  DELETE_SELECTED_BOOKS = 'DELETE_SELECTED_BOOKS',
  SET_SELECTED_BOOKS = 'SET_SELECTED_BOOKS',
  SORT_BOOKS = 'SORT_BOOKS',
}

// Action接口
export interface AddBookAction {
  type: BookActionType.ADD_BOOK;
  payload: Book;
}

export interface UpdateBookAction {
  type: BookActionType.UPDATE_BOOK;
  payload: Book;
}

export interface DeleteBookAction {
  type: BookActionType.DELETE_BOOK;
  payload: string;
}

export interface DeleteSelectedBooksAction {
  type: BookActionType.DELETE_SELECTED_BOOKS;
}

export interface SetSelectedBooksAction {
  type: BookActionType.SET_SELECTED_BOOKS;
  payload: string[];
}

export interface SortBooksAction {
  type: BookActionType.SORT_BOOKS;
  payload: keyof Book | 'price';
}

export type BookAction =
  | AddBookAction
  | UpdateBookAction
  | DeleteBookAction
  | DeleteSelectedBooksAction
  | SetSelectedBooksAction
  | SortBooksAction;

// State接口
export interface BookState {
  books: Book[];
  selectedBooks: string[];
  sortBy: keyof Book | null;
}