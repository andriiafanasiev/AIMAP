import React from 'react';
import { Filter } from 'lucide-react';

const CategoryFilter = ({ selectedCategories, onCategoryChange, availableCategories }) => {
  const categoryLabels = {
    text: 'Текст',
    image: 'Зображення',
    video: 'Відео',
    audio: 'Аудіо',
    chatbot: 'Чат-бот',
    pdf: 'PDF',
    code: 'Код',
    voice: 'Голос',
    fun: 'Розваги',
    research: 'Дослідження',
    productivity: 'Продуктивність',
    education: 'Освіта',
    marketing: 'Маркетинг',
    'open-source': 'Open Source'
  };

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const clearAllFilters = () => {
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
            onClick={clearAllFilters}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            Очистити
          </button>
        )}
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Категорії ({selectedCategories.length}/{availableCategories.length})
        </h4>
        
        <div className="grid grid-cols-2 gap-2">
          {availableCategories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            const count = availableCategories.filter(c => c === category).length;
            
            return (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-2 border-blue-300 dark:border-blue-700'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border-2 border-transparent'
                }`}
              >
                <span>{categoryLabels[category] || category}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isSelected
                    ? 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedCategories.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {categoryLabels[category] || category}
                <button
                  onClick={() => handleCategoryToggle(category)}
                  className="ml-2 hover:text-blue-600 dark:hover:text-blue-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter; 