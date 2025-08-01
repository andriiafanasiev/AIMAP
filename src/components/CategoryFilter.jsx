import React from 'react';
import { Filter, X } from 'lucide-react';
import CategoryIcons from './CategoryIcons';
import { useLanguage } from '../context/LanguageContext';

const CategoryFilter = ({ selectedCategories, onCategoryChange }) => {
    const { t } = useLanguage();

    const categories = [
        { id: 'text', name: t('categories.text') },
        { id: 'image', name: t('categories.image') },
        { id: 'video', name: t('categories.video') },
        { id: 'audio', name: t('categories.audio') },
        { id: 'chatbot', name: t('categories.chatbot') },
        { id: 'code', name: t('categories.code') },
        { id: 'voice', name: t('categories.voice') },
        { id: 'productivity', name: t('categories.productivity') },
        { id: 'marketing', name: t('categories.marketing') },
        { id: 'research', name: t('categories.research') },
        { id: 'open-source', name: t('categories.open-source') },
        { id: 'education', name: t('categories.education') },
        { id: 'fun', name: t('categories.fun') },
        { id: '3d', name: t('categories.3d') },
    ];

    const toggleCategory = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            onCategoryChange(
                selectedCategories.filter((id) => id !== categoryId)
            );
        } else {
            onCategoryChange([...selectedCategories, categoryId]);
        }
    };

    const clearAll = () => {
        onCategoryChange([]);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    {t('catalog.filters')}
                </h3>
                {selectedCategories.length > 0 && (
                    <button
                        onClick={clearAll}
                        className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors flex items-center"
                    >
                        <X className="w-3 h-3 mr-1" />
                        {t('catalog.clear')}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-2 lg:max-h-none lg:overflow-visible max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => toggleCategory(category.id)}
                        className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap min-h-[44px] ${
                            selectedCategories.includes(category.id)
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-2 border-purple-300 dark:border-purple-700 shadow-md'
                                : 'bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                    >
                        <CategoryIcons
                            category={category.id}
                            className={`w-4 h-4 flex-shrink-0 ${
                                selectedCategories.includes(category.id)
                                    ? 'text-purple-600 dark:text-purple-300'
                                    : 'text-gray-500 dark:text-gray-400'
                            }`}
                        />
                        <span className="truncate">{category.name}</span>
                    </button>
                ))}
            </div>

            {selectedCategories.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                        {t('catalog.selected')}: {selectedCategories.length}{' '}
                        {t('catalog.categories')}
                    </p>
                </div>
            )}
        </div>
    );
};

export default CategoryFilter;
