import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SearchBar = ({ onSearch, placeholder }) => {
    const [query, setQuery] = useState('');
    const { t } = useLanguage();

    const handleSearch = (value) => {
        setQuery(value);
        onSearch(value);
    };

    const clearSearch = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder={placeholder || t('catalog.search')}
            />
            {query && (
                <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
