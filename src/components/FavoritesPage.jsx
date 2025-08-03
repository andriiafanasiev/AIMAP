import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import ToolCard from './ToolCard';
import aiToolsData from '../data/ai-tools.json';

const FavoritesPage = () => {
    const { t } = useLanguage();
    const { favorites, clearFavorites } = useFavorites();

    const favoriteTools = aiToolsData.filter(tool => favorites.includes(tool.id));

    const handleCardClick = (tool) => {
        // Тут можна додати логіку для відкриття модального вікна
        console.log('Tool clicked:', tool);
    };

    if (favorites.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <div className="text-6xl mb-6">💔</div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {t('favorites.emptyTitle')}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        {t('favorites.emptyDescription')}
                    </p>
                    <a
                        href="/"
                        className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                    >
                        {t('favorites.exploreTools')}
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                    <Heart className="w-8 h-8 text-red-500 fill-current" />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {t('favorites.title')}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            {t('favorites.subtitle')} ({favorites.length})
                        </p>
                    </div>
                </div>
                <button
                    onClick={clearFavorites}
                    className="inline-flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                    title={t('favorites.clearAll')}
                >
                    <Trash2 className="w-5 h-5 mr-2" />
                    {t('favorites.clearAll')}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {favoriteTools.map((tool) => (
                    <ToolCard
                        key={tool.id}
                        tool={tool}
                        onCardClick={handleCardClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default FavoritesPage; 