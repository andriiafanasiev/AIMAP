import React from 'react';
import { Star, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getTopRatedTools } from '../lib/reviews';
import aiToolsData from '../data/ai-tools.json';

const TopRatedTools = () => {
    const { t } = useLanguage();
    const topRated = getTopRatedTools(6);

    const getToolById = (toolId) => {
        return aiToolsData.find(tool => tool.id === toolId);
    };

    if (topRated.length === 0) return null;

    return (
        <section className="py-12 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {t('catalog.topRated')}
                        </h2>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {t('catalog.topRatedDesc')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topRated.map((item, index) => {
                        const tool = getToolById(item.toolId);
                        if (!tool) return null;

                        return (
                            <div
                                key={item.toolId}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="relative">
                                            <img
                                                src={tool.image}
                                                alt={tool.name}
                                                className="w-12 h-12 rounded-xl object-cover bg-gray-100 dark:bg-gray-700"
                                                onError={(e) => {
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=6366f1&color=ffffff&size=48&font-size=0.4`;
                                                }}
                                            />
                                            {index < 3 && (
                                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                                    <span className="text-xs font-bold text-white">
                                                        {index + 1}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {tool.name}
                                            </h3>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <div className="flex items-center">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                                                        {item.averageRating.toFixed(1)}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    ({item.reviewCount} {t('catalog.reviews')})
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                                    {tool.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex flex-wrap gap-1">
                                        {tool.categories.slice(0, 2).map((category) => (
                                            <span
                                                key={category}
                                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                            >
                                                {t(`categories.${category}`)}
                                            </span>
                                        ))}
                                    </div>
                                    <a
                                        href={tool.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-3 py-1 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                                    >
                                        {t('catalog.visitSite')}
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TopRatedTools; 