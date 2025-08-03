import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import ToolsCatalog from './components/ToolsCatalog';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import './App.css';

function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <FavoritesProvider>
                    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
                        <Navbar />
                        <Hero />
                        <ToolsCatalog />
                    </div>
                </FavoritesProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}

export default App;
