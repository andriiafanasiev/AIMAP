import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Завантаження улюблених з localStorage при ініціалізації
    useEffect(() => {
        const savedFavorites = localStorage.getItem('ai-tools-favorites');
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (error) {
                console.error('Error loading favorites:', error);
                setFavorites([]);
            }
        }
    }, []);

    // Збереження улюблених в localStorage при зміні
    useEffect(() => {
        localStorage.setItem('ai-tools-favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (toolId) => {
        setFavorites(prev => {
            if (!prev.includes(toolId)) {
                return [...prev, toolId];
            }
            return prev;
        });
    };

    const removeFromFavorites = (toolId) => {
        setFavorites(prev => prev.filter(id => id !== toolId));
    };

    const toggleFavorite = (toolId) => {
        if (favorites.includes(toolId)) {
            removeFromFavorites(toolId);
        } else {
            addToFavorites(toolId);
        }
    };

    const isFavorite = (toolId) => {
        return favorites.includes(toolId);
    };

    const getFavoritesCount = () => {
        return favorites.length;
    };

    const clearFavorites = () => {
        setFavorites([]);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        getFavoritesCount,
        clearFavorites
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}; 