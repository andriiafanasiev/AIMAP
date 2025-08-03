import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Search, Moon, Sun, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();
    const { isDark, toggleTheme } = useTheme();
    const { getFavoritesCount } = useFavorites();

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/20 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center"
                    >
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                AIMAP
                            </h1>
                        </div>
                    </motion.div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <button className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                {t('nav.home')}
                            </button>
                            <button className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                {t('nav.catalog')}
                            </button>
                            <button className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                {t('nav.categories')}
                            </button>
                            <button className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                {t('nav.about')}
                            </button>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <button 
                            onClick={() => {
                                const searchSection = document.querySelector('.search-section');
                                if (searchSection) {
                                    searchSection.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            className="p-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                        <button 
                            onClick={() => {
                                // Тут можна додати логіку для відкриття сторінки улюблених
                                console.log('Favorites clicked');
                            }}
                            className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                        >
                            <Heart className="h-5 w-5" />
                            {getFavoritesCount() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {getFavoritesCount()}
                                </span>
                            )}
                        </button>
                        <LanguageSwitcher />
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                        >
                            {isDark ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-2xl hover:shadow-lg transition-all duration-300">
                            {t('nav.addTool')}
                        </button>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white p-2"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white/98 dark:bg-black/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                            {t('nav.home')}
                        </button>
                        <button className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                            {t('nav.catalog')}
                        </button>
                        <button className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                            {t('nav.categories')}
                        </button>
                        <button className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                            {t('nav.about')}
                        </button>
                        <div className="flex items-center space-x-4 px-3 py-2">
                            <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                                <Search className="h-5 w-5" />
                            </button>
                            <LanguageSwitcher />
                            <button
                                onClick={toggleTheme}
                                className="p-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                            >
                                {isDark ? (
                                    <Sun className="h-5 w-5" />
                                ) : (
                                    <Moon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-2xl">
                            {t('nav.addTool')}
                        </button>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};
