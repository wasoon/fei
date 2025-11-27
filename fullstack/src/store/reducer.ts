import { BookState, BookAction, BookActionType } from './types';

// 初始状态
const initialState: BookState = {
  books: [
    {
      id: '1',
      title: 'JavaScript高级程序设计',
      price: 99.00,
      category: '编程',
      description: '一本全面介绍JavaScript语言的经典教材',
    },
    {
      id: '2',
      title: 'TypeScript实战指南',
      price: 88.50,
      category: '编程',
      description: '详细讲解TypeScript的核心特性和最佳实践',
    },
    {
      id: '3',
      title: 'React设计模式与最佳实践',
      price: 108.00,
      category: '前端',
      description: '探索React应用程序的设计模式和最佳实践',
    },
  ],
  selectedBooks: [],
  sortBy: null,
};

/**
 * 书籍Reducer
 * @param state 当前状态
 * @param action 要处理的Action
 * @returns 新的状态
 */
export const bookReducer = (state = initialState, action: BookAction): BookState => {
  switch (action.type) {
    case BookActionType.ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
      };

    case BookActionType.UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map(book =>
          book.id === action.payload.id ? action.payload : book
        ),
      };

    case BookActionType.DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload),
        selectedBooks: state.selectedBooks.filter(id => id !== action.payload),
      };

    case BookActionType.DELETE_SELECTED_BOOKS:
      return {
        ...state,
        books: state.books.filter(book => !state.selectedBooks.includes(book.id)),
        selectedBooks: [],
      };

    case BookActionType.SET_SELECTED_BOOKS:
      return {
        ...state,
        selectedBooks: action.payload,
      };

    case BookActionType.SORT_BOOKS:
      const sortedBooks = [...state.books].sort((a, b) => {
        if (action.payload === 'price') {
          return a.price - b.price;
        } else {
          return a[action.payload].localeCompare(b[action.payload]);
        }
      });
      
      return {
        ...state,
        books: sortedBooks,
        sortBy: action.payload,
      };

    default:
      return state;
  }
};