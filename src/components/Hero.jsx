import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Brain, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Hero = () => {
    const { t } = useLanguage();

    const scrollToSearch = () => {
        const searchSection = document.querySelector('.search-section');
        if (searchSection) {
            searchSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="h-screen w-full bg-gray-50 dark:bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
            <div className="w-full absolute inset-0 h-screen">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
                <div className="absolute inset-0 bg-white/30 dark:bg-black/50" />
            </div>

            <div className="relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center justify-center mb-6"
                >
                    <Sparkles className="h-8 w-8 text-yellow-400 mr-3" />
                    <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        AIMAP
                    </h1>
                    <Sparkles className="h-8 w-8 text-yellow-400 ml-3" />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
                >
                    {t('hero.subtitle')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button 
                        onClick={scrollToSearch}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center"
                    >
                        <Search className="h-5 w-5 mr-2" />
                        {t('hero.search')}
                    </button>
                    <button className="px-8 py-4 bg-transparent border-2 border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:border-purple-500 hover:text-purple-400 transition-all duration-300 flex items-center">
                        <Brain className="h-5 w-5 mr-2" />
                        {t('hero.explore')}
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-12 flex flex-wrap justify-center gap-8"
                >
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                        <span>{t('hero.tools')}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Brain className="h-5 w-5 mr-2 text-blue-400" />
                        <span>{t('hero.aiTech')}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Search className="h-5 w-5 mr-2 text-purple-400" />
                        <span>{t('hero.fastSearch')}</span>
                    </div>
                </motion.div>
            </div>

            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/10 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
