import React, { useState, useEffect } from 'react';
import ToolCard from './ToolCard';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import SortSelect from './SortSelect';
import Stats from './Stats';
import ToolModal from './ToolModal';
import FeaturedTools from './FeaturedTools';
import TopRatedTools from './TopRatedTools';
import { searchTools, filterToolsByCategories, sortTools } from '../lib/search';
import aiToolsData from '../data/ai-tools.json';
import { useLanguage } from '../context/LanguageContext';

const ToolsCatalog = () => {
    const { t } = useLanguage();
    const [tools, setTools] = useState(aiToolsData);
    const [filteredTools, setFilteredTools] = useState(aiToolsData);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortBy, setSortBy] = useState('name');
    const [selectedTool, setSelectedTool] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let result = tools;

        result = searchTools(result, searchQuery);
        result = filterToolsByCategories(result, selectedCategories);
        result = sortTools(result, sortBy);

        setFilteredTools(result);
    }, [tools, searchQuery, selectedCategories, sortBy]);

    const handleCardClick = (tool) => {
        setSelectedTool(tool);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTool(null);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('catalog.title')}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {t('catalog.subtitle')}
                </p>
                <FeaturedTools tools={tools} onToolClick={handleCardClick} />
            </div>
            
            <TopRatedTools />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <Stats tools={tools} />
                    <CategoryFilter
                        selectedCategories={selectedCategories}
                        onCategoryChange={setSelectedCategories}
                    />
                </div>

                <div className="lg:col-span-3 space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <SearchBar onSearch={setSearchQuery} />
                        </div>
                        <div className="w-full sm:w-64">
                            <SortSelect value={sortBy} onChange={setSortBy} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t('catalog.found')} {filteredTools.length} {t('catalog.tools')}
                        </p>
                        {selectedCategories.length > 0 && (
                            <p className="text-sm text-purple-600 dark:text-purple-400">
                                {t('catalog.filtered')} {selectedCategories.length}{' '}
                                {t('catalog.categories')}
                            </p>
                        )}
                    </div>

                    {filteredTools.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {t('catalog.noResults')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {t('catalog.noResultsDesc')}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredTools.map((tool) => (
                                <ToolCard
                                    key={tool.id}
                                    tool={tool}
                                    onCardClick={handleCardClick}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <ToolModal
                tool={selectedTool}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
};

export default ToolsCatalog;
