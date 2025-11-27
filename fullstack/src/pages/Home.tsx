import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { RootState, AppDispatch } from '../store';
import { 
  addBook as addBookAction, 
  updateBook as updateBookAction, 
  deleteBook as deleteBookAction,
  deleteSelectedBooks as deleteSelectedBooksAction,
  setSelectedBooks as setSelectedBooksAction,
  sortBooks as sortBooksAction
} from '../store/actions';
import BookItem from '../components/BookItem';
import BookForm from '../components/BookForm';
import { Book } from '../store/types';
import { toast } from 'sonner';
import { SortAsc, Trash2 } from 'lucide-react';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { books, selectedBooks, sortBy } = useSelector((state: RootState) => state);
  
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // 添加书籍
  const handleAddBook = (bookData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...bookData,
      id: uuidv4(),
    };
    dispatch(addBookAction(newBook));
    setIsAddFormOpen(false);
    toast.success('书籍添加成功');
  };

  // 编辑书籍
  const handleEditBook = (bookData: Omit<Book, 'id'>) => {
    if (editingBook) {
      const updatedBook: Book = {
        ...bookData,
        id: editingBook.id,
      };
      dispatch(updateBookAction(updatedBook));
      setIsEditFormOpen(false);
      setEditingBook(null);
      toast.success('书籍更新成功');
    }
  };

  // 删除书籍
  const handleDeleteBook = (id: string) => {
    if (window.confirm('确定要删除这本书吗？')) {
      dispatch(deleteBookAction(id));
      toast.success('书籍删除成功');
    }
  };

  // 批量删除书籍
  const handleDeleteSelectedBooks = () => {
    if (selectedBooks.length === 0) {
      toast.warning('请先选择要删除的书籍');
      return;
    }
    
    if (window.confirm(`确定要删除选中的 ${selectedBooks.length} 本书吗？`)) {
      dispatch(deleteSelectedBooksAction());
      toast.success(`成功删除 ${selectedBooks.length} 本书`);
    }
  };

  // 选择书籍
  const handleSelectBook = (id: string) => {
    const newSelectedBooks = selectedBooks.includes(id)
      ? selectedBooks.filter(bookId => bookId !== id)
      : [...selectedBooks, id];
    dispatch(setSelectedBooksAction(newSelectedBooks));
  };

  // 全选/取消全选
  const handleSelectAll = () => {
    if (selectedBooks.length === books.length) {
      dispatch(setSelectedBooksAction([]));
    } else {
      dispatch(setSelectedBooksAction(books.map(book => book.id)));
    }
  };

  // 排序书籍
  const handleSortBooks = (field: keyof Book | 'price') => {
    dispatch(sortBooksAction(field));
  };

  // 打开编辑弹窗
  const handleOpenEditForm = (book: Book) => {
    setEditingBook(book);
    setIsEditFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">线上图书系统</h1>
          <p className="text-gray-600 mt-1">管理您的书籍收藏</p>
        </header>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* 顶部操作栏 */}
          <div className="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center">
              <button
                onClick={handleSelectAll}
                className="flex items-center text-sm text-gray-600 hover:text-blue-600"
              >
                <input
                  type="checkbox"
                  checked={books.length > 0 && selectedBooks.length === books.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span>全选</span>
              </button>
              
              {selectedBooks.length > 0 && (
                <button
                  onClick={handleDeleteSelectedBooks}
                  className="ml-3 flex items-center text-sm text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} className="mr-1" />
                  <span>删除所选 ({selectedBooks.length})</span>
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {/* 排序下拉菜单 */}
              <div className="relative">
                <button
                  onClick={() => handleSortBooks('title')}
                  className={`px-3 py-1.5 text-sm rounded border flex items-center ${
                    sortBy === 'title' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <SortAsc size={14} className="mr-1" />
                  <span>按书名排序</span>
                </button>
              </div>
              
              <div className="relative">
                <button
                  onClick={() => handleSortBooks('price')}
                  className={`px-3 py-1.5 text-sm rounded border flex items-center ${
                    sortBy === 'price' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <SortAsc size={14} className="mr-1" />
                  <span>按价格排序</span>
                </button>
              </div>
              
              {/* 添加书籍按钮 */}
              <button
                onClick={() => setIsAddFormOpen(true)}
                className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
              >
                添加书籍
              </button>
            </div>
          </div>

          {/* 书籍列表 */}
          <div className="divide-y divide-gray-100">
            {books.length > 0 ? (
              books.map(book => (
                <BookItem
                  key={book.id}
                  book={book}
                  isSelected={selectedBooks.includes(book.id)}
                  onSelect={handleSelectBook}
                  onEdit={handleOpenEditForm}
                  onDelete={handleDeleteBook}
                />
              ))
            ) : (
              <div className="p-10 text-center text-gray-500">
                <p>暂无书籍，点击"添加书籍"按钮添加第一本书吧！</p>
              </div>
            )}
          </div>
        </div>

        {/* 统计信息 */}
        <div className="mt-4 text-sm text-gray-600">
          <p>共 {books.length} 本书</p>
        </div>
      </div>

      {/* 添加书籍弹窗 */}
      <BookForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSubmit={handleAddBook}
      />

      {/* 编辑书籍弹窗 */}
      <BookForm
        isOpen={isEditFormOpen}
        onClose={() => {
          setIsEditFormOpen(false);
          setEditingBook(null);
        }}
        onSubmit={handleEditBook}
        editingBook={editingBook}
      />
    </div>
  );
}