import React, { useState, useEffect } from 'react';
import { Book } from '../store/types';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface BookFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: Omit<Book, 'id'>) => void;
  editingBook?: Book | null;
}

const BookForm: React.FC<BookFormProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editingBook 
}) => {
  const [formData, setFormData] = useState<Omit<Book, 'id'>>({
    title: '',
    price: 0,
    category: '',
    description: '',
  });

  // 当编辑书籍变化时，更新表单数据
  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title,
        price: editingBook.price,
        category: editingBook.category,
        description: editingBook.description,
      });
    } else {
      // 重置表单
      setFormData({
        title: '',
        price: 0,
        category: '',
        description: '',
      });
    }
  }, [editingBook]);

  // 处理输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // 处理价格字段
    if (name === 'price') {
      const numValue = parseFloat(value);
      setFormData(prev => ({
        ...prev,
        [name]: isNaN(numValue) ? 0 : numValue,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    if (!formData.title.trim()) {
      toast.error('请输入书名');
      return;
    }
    
    if (formData.price <= 0) {
      toast.error('请输入有效的价格');
      return;
    }
    
    if (!formData.category.trim()) {
      toast.error('请输入分类');
      return;
    }
    
    onSubmit(formData);
  };

  // 如果弹窗未打开，不渲染任何内容
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {editingBook ? '编辑书籍' : '添加书籍'}
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
            aria-label="关闭"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              书名
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="请输入书名"
              required
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              价格
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="请输入价格"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              分类
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="请输入分类"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              描述
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="请输入描述"
              rows={4}
            />
          </div>
          
          <div className="pt-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {editingBook ? '保存' : '添加'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;