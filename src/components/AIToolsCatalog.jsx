import React, { useState, useEffect } from 'react';
import ToolCard from './ToolCard';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import { filterAndSearchTools, getUniqueCategories, getToolsStats } from '../lib/search';
import { Grid, Filter, Search, Zap } from 'lucide-react';

const AIToolsCatalog = () => {
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Завантаження даних
    const loadTools = async () => {
      try {
        const response = await import('../data/ai-tools.json');
        setTools(response.default);
        setFilteredTools(response.default);
      } catch (error) {
        console.error('Помилка завантаження інструментів:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTools();
  }, []);

  useEffect(() => {
    // Фільтрація та пошук
    const filtered = filterAndSearchTools(tools, searchQuery, selectedCategories);
    setFilteredTools(filtered);
  }, [tools, searchQuery, selectedCategories]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const availableCategories = getUniqueCategories(tools);
  const stats = getToolsStats(tools);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Каталог AI-інструментів
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Відкрийте світ штучного інтелекту: {stats.total} інструментів для ваших завдань
        </p>
        
        {/* Статистика */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Всього</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.free}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Безкоштовно</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.withAPI}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">З API</div>
          </div>
        </div>
      </div>

      {/* Пошук та фільтри */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onClearSearch={handleClearSearch}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-center px-6 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter className="w-5 h-5 mr-2" />
            Фільтри
          </button>
        </div>

        {/* Фільтри для десктопу */}
        <div className="hidden lg:block">
          <CategoryFilter
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            availableCategories={availableCategories}
          />
        </div>

        {/* Фільтри для мобільного */}
        {showFilters && (
          <div className="lg:hidden">
            <CategoryFilter
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              availableCategories={availableCategories}
            />
          </div>
        )}
      </div>

      {/* Результати */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Результати ({filteredTools.length})
          </h2>
          {(searchQuery || selectedCategories.length > 0) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategories([]);
              }}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              Очистити всі фільтри
            </button>
          )}
        </div>
      </div>

      {/* Сітка інструментів */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Нічого не знайдено
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Спробуйте змінити пошуковий запит або фільтри
          </p>
        </div>
      )}
    </div>
  );
};

export default AIToolsCatalog; 