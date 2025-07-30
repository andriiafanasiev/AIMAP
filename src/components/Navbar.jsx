import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Search, Moon, Sun } from 'lucide-react';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-gray-800">
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
                            <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Головна
                            </button>
                            <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Каталог
                            </button>
                            <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Категорії
                            </button>
                            <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Про нас
                            </button>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <button className="p-2 text-gray-300 hover:text-white transition-colors">
                            <Search className="h-5 w-5" />
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-300 hover:text-white transition-colors"
                        >
                            {isDark ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-2xl hover:shadow-lg transition-all duration-300">
                            Додати інструмент
                        </button>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white p-2"
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
                    className="md:hidden bg-black/95 backdrop-blur-md border-b border-gray-800"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                            Головна
                        </button>
                        <button className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                            Каталог
                        </button>
                        <button className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                            Категорії
                        </button>
                        <button className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                            Про нас
                        </button>
                        <div className="flex items-center space-x-4 px-3 py-2">
                            <button className="p-2 text-gray-300 hover:text-white">
                                <Search className="h-5 w-5" />
                            </button>
                            <button
                                onClick={toggleTheme}
                                className="p-2 text-gray-300 hover:text-white"
                            >
                                {isDark ? (
                                    <Sun className="h-5 w-5" />
                                ) : (
                                    <Moon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-2xl">
                            Додати інструмент
                        </button>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};
