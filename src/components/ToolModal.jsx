import React, { useState } from 'react';
import {
    X,
    ExternalLink,
    Tag,
    Zap,
    Code,
    DollarSign,
    Star,
    MessageSquare,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import RatingStars from './RatingStars';
import ReviewModal from './ReviewModal';
import { getAverageRating, getReviewCount, getReviewsByToolId } from '../lib/reviews';

const ToolModal = ({ tool, isOpen, onClose }) => {
    const { t } = useLanguage();
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    
    const averageRating = getAverageRating(tool?.id);
    const reviewCount = getReviewCount(tool?.id);
    const reviews = getReviewsByToolId(tool?.id);

    if (!isOpen || !tool) return null;

    const handleImageError = (e) => {
        // Спочатку спробуємо локальну іконку
        const localIconPath = `/icons/ai-tools/${tool.id}.svg`;
        if (e.target.src !== localIconPath) {
            e.target.src = localIconPath;
        } else {
            // Якщо локальна іконка не знайдена, використовуємо UI Avatars
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                tool.name
            )}&background=6366f1&color=ffffff&size=64&font-size=0.5`;
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <img
                                src={tool.image}
                                alt={tool.name}
                                className="w-16 h-16 rounded-xl object-cover bg-gray-100 dark:bg-gray-700"
                                onError={handleImageError}
                                loading="lazy"
                            />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {tool.name}
                                </h2>
                                {averageRating > 0 && (
                                    <div className="flex items-center space-x-2 mt-2">
                                        <RatingStars rating={averageRating} size={20} showNumber={true} />
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            ({reviewCount} {t('catalog.reviews')})
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center space-x-2 mt-2">
                                    {tool.isFree && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                            <DollarSign className="w-4 h-4 mr-1" />
                                            {t('catalog.free')}
                                        </span>
                                    )}
                                    {tool.hasAPI && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                            <Code className="w-4 h-4 mr-1" />
                                            {t('catalog.api')}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Опис
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {getToolDescription()}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                Категорії
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {tool.categories.map((category) => (
                                    <span
                                        key={category}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                    >
                                        <Tag className="w-4 h-4 mr-1" />
                                        {t(`categories.${category}`)}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                Теги
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {tool.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                    >
                                        <Zap className="w-3 h-3 mr-1" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {reviews.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                    {t('review.reviews')}
                                </h3>
                                <div className="space-y-4 max-h-48 overflow-y-auto">
                                    {reviews.slice(0, 3).map((review) => (
                                        <div key={review.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <RatingStars rating={review.rating} size={16} />
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {new Date(review.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    ID: {tool.id}
                                </span>
                                <button
                                    onClick={() => setIsReviewModalOpen(true)}
                                    className="inline-flex items-center px-3 py-1 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                                >
                                    <MessageSquare className="w-4 h-4 mr-1" />
                                    {t('review.addReview')}
                                </button>
                            </div>
                            <a
                                href={tool.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                            >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                {t('catalog.visitSite')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <ReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                tool={tool}
                onSubmit={(review) => {
                    console.log('Review submitted:', review);
                    setIsReviewModalOpen(false);
                }}
            />
        </div>
    );
};

export default ToolModal;
