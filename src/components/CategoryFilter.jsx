import React from 'react';
import { Filter } from 'lucide-react';

const categories = [
  { id: 'text', name: 'Текст', icon: '📝' },
  { id: 'image', name: 'Зображення', icon: '🖼️' },
  { id: 'video', name: 'Відео', icon: '🎥' },
  { id: 'audio', name: 'Аудіо', icon: '🎵' },
  { id: 'chatbot', name: 'Чатбот', icon: '🤖' },
  { id: 'code', name: 'Код', icon: '💻' },
  { id: 'voice', name: 'Голос', icon: '🎤' },
  { id: 'productivity', name: 'Продуктивність', icon: '⚡' },
  { id: 'marketing', name: 'Маркетинг', icon: '📈' },
  { id: 'research', name: 'Дослідження', icon: '🔬' },
  { id: 'open-source', name: 'Open Source', icon: '🔓' },
  { id: 'education', name: 'Освіта', icon: '📚' },
  { id: 'fun', name: 'Розваги', icon: '🎮' }
];

const CategoryFilter = ({ selectedCategories, onCategoryChange }) => {
  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter(id => id !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  const clearAll = () => {
    onCategoryChange([]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Фільтри
        </h3>
        {selectedCategories.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            Очистити
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              selectedCategories.includes(category.id)
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-2 border-purple-300 dark:border-purple-700'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border-2 border-transparent'
            }`}
          >
            <span className="text-base">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {selectedCategories.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Обрано: {selectedCategories.length} категорій
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter; 