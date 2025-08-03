import React from 'react';
import { X, Heart, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import ToolCard from './ToolCard';
import aiToolsData from '../data/ai-tools.json';

const FavoritesModal = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    const { favorites, clearFavorites } = useFavorites();

    const favoriteTools = aiToolsData.filter(tool => favorites.includes(tool.id));

    const handleCardClick = (tool) => {
        // Тут можна додати логіку для відкриття модального вікна з деталями
        console.log('Tool clicked:', tool);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <Heart className="w-8 h-8 text-red-500 fill-current" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {t('favorites.title')}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {t('favorites.subtitle')} ({favorites.length})
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {favorites.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-6">💔</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                {t('favorites.emptyTitle')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-8">
                                {t('favorites.emptyDescription')}
                            </p>
                            <button
                                onClick={onClose}
                                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                            >
                                {t('favorites.exploreTools')}
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {favorites.length} {t('favorites.tools')}
                                    </span>
                                </div>
                                <button
                                    onClick={clearFavorites}
                                    className="inline-flex items-center px-3 py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                                    title={t('favorites.clearAll')}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FavoritesModal; 