import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const FavoriteButton = ({ toolId, size = 20, className = '' }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isFavorited = isFavorite(toolId);

    const handleClick = (e) => {
        e.stopPropagation();
        toggleFavorite(toolId);
    };

    return (
        <button
            onClick={handleClick}
            className={`transition-all duration-200 hover:scale-110 ${className}`}
            title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
            <Heart
                size={size}
                className={`${
                    isFavorited
                        ? 'fill-red-500 text-red-500'
                        : 'fill-gray-200 text-gray-400 hover:text-red-400 dark:fill-gray-600 dark:text-gray-500 dark:hover:text-red-400'
                } transition-colors duration-200`}
            />
        </button>
    );
};

export default FavoriteButton; 