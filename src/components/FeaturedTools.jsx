import React from 'react';
import { Star, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FeaturedTools = ({ tools, onToolClick }) => {
    const { t } = useLanguage();
    const featuredTools = tools.slice(0, 6);

    return (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <Star className="w-6 h-6 text-yellow-500" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {t('catalog.featured.title')}
                    </h3>
                </div>
                <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredTools.map((tool, index) => (
                    <div
                        key={tool.id}
                        onClick={() => onToolClick(tool)}
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700 group"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <img
                                    src={tool.image}
                                    alt={tool.name}
                                    className="w-10 h-10 rounded-lg object-cover"
                                    onError={(e) => {
                                        e.target.src =
                                            'https://via.placeholder.com/40x40/6366f1/ffffff?text=AI';
                                    }}
                                />
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <span className="text-xs font-bold text-white">
                                        {index + 1}
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                    {tool.name}
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                    {t(`categories.${tool.categories[0]}`)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('catalog.featured.description')}
                </p>
            </div>
        </div>
    );
};

export default FeaturedTools;
