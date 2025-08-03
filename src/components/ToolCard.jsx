import React from 'react';
import { ExternalLink, Tag, Zap, Code, DollarSign, Info } from 'lucide-react';
import CategoryIcons from './CategoryIcons';
import { useLanguage } from '../context/LanguageContext';
import FavoriteButton from './FavoriteButton';

const ToolCard = ({ tool, onCardClick }) => {
    const { t } = useLanguage();

    const handleCardClick = (e) => {
        e.preventDefault();
        if (onCardClick) {
            onCardClick(tool);
        }
    };

    const handleExternalClick = (e) => {
        e.stopPropagation();
        window.open(tool.url, '_blank', 'noopener,noreferrer');
    };

    const handleImageError = (e) => {
        // Спочатку спробуємо локальну іконку
        const localIconPath = `/icons/ai-tools/${tool.id}.svg`;
        if (e.target.src !== localIconPath) {
            e.target.src = localIconPath;
        } else {
            // Якщо локальна іконка не знайдена, використовуємо UI Avatars
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                tool.name
            )}&background=6366f1&color=ffffff&size=48&font-size=0.4`;
        }
    };

    const getToolDescription = () => {
        try {
            return t(`tools.${tool.id}.description`) || tool.description;
        } catch {
            return tool.description;
        }
    };

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 group"
            onClick={handleCardClick}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <img
                        src={tool.image}
                        alt={tool.name}
                        className="w-12 h-12 rounded-xl object-cover bg-gray-100 dark:bg-gray-700"
                        onError={handleImageError}
                        loading="lazy"
                    />
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {tool.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                            {tool.isFree && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    <DollarSign className="w-3 h-3 mr-1" />
                                    {t('catalog.free')}
                                </span>
                            )}
                            {tool.hasAPI && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    <Code className="w-3 h-3 mr-1" />
                                    {t('catalog.api')}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-1">
                    <FavoriteButton toolId={tool.id} size={14} className="p-1" />
                    <button
                        onClick={handleExternalClick}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        title={t('catalog.openSite')}
                    >
                        <ExternalLink className="w-4 h-4" />
                    </button>
                    <div
                        className="p-1 text-gray-400 group-hover:text-purple-500 transition-colors"
                        title={t('catalog.details')}
                    >
                        <Info className="w-4 h-4" />
                    </div>
                </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                {getToolDescription()}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {tool.categories.map((category) => (
                    <span
                        key={category}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                    >
                        <CategoryIcons
                            category={category}
                            className="w-3 h-3 mr-1"
                        />
                        {t(`categories.${category}`)}
                    </span>
                ))}
            </div>

            <div className="flex flex-wrap gap-1">
                {tool.tags.slice(0, 3).map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    >
                        <Zap className="w-3 h-3 mr-1" />
                        {tag}
                    </span>
                ))}
                {tool.tags.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        +{tool.tags.length - 3}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ToolCard;
