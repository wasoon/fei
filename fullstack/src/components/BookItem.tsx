import React from 'react';
import { Book } from '../store/types';
import { Trash2 } from 'lucide-react';

interface BookItemProps {
  book: Book;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const BookItem: React.FC<BookItemProps> = ({ 
  book, 
  isSelected, 
  onSelect, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div 
      className={`p-4 border-b border-gray-200 hover:bg-gray-50 transition cursor-pointer flex items-center ${
        isSelected ? 'bg-blue-50' : ''
      }`}
      onClick={(e) => {
        // 如果点击的是删除按钮，不触发编辑
        if ((e.target as HTMLElement).closest('.delete-btn')) return;
        onEdit(book);
      }}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(book.id)}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-3 cursor-pointer"
      />
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{book.title}</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="text-sm text-blue-600 font-medium">￥{book.price.toFixed(2)}</span>
          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
            {book.category}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500 line-clamp-1">{book.description}</p>
      </div>
      
      <button
        className="delete-btn p-2 text-gray-400 hover:text-red-500 ml-2"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(book.id);
        }}
        aria-label="删除"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default BookItem;