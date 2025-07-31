import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSwitcher = () => {
    const { currentLanguage, changeLanguage, availableLanguages } =
        useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languageNames = {
        en: 'English',
        uk: 'Українська',
        de: 'Deutsch',
    };

    const languageFlags = {
        en: '🇺🇸',
        uk: '🇺🇦',
        de: '🇩🇪',
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (language) => {
        changeLanguage(language);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
            >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">
                    {languageFlags[currentLanguage]}{' '}
                    {languageNames[currentLanguage]}
                </span>
                <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 bg-white/98 dark:bg-gray-900/95 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl z-50"
                    >
                        <div className="py-1">
                            {availableLanguages.map((language) => (
                                <button
                                    key={language}
                                    onClick={() =>
                                        handleLanguageChange(language)
                                    }
                                    className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                                        currentLanguage === language
                                            ? 'bg-blue-600/20 text-blue-400'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50'
                                    }`}
                                >
                                    <span className="text-lg">
                                        {languageFlags[language]}
                                    </span>
                                    <span>{languageNames[language]}</span>
                                    {currentLanguage === language && (
                                        <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
