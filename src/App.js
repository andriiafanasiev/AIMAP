import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import ToolsCatalog from './components/ToolsCatalog';
import FavoritesModal from './components/FavoritesModal';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import './App.css';

function App() {
    const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);

    return (
        <ThemeProvider>
            <LanguageProvider>
                <FavoritesProvider>
                    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
                        <Navbar onFavoritesClick={() => setIsFavoritesModalOpen(true)} />
                        <Hero />
                        <ToolsCatalog />
                        <FavoritesModal 
                            isOpen={isFavoritesModalOpen}
                            onClose={() => setIsFavoritesModalOpen(false)}
                        />
                    </div>
                </FavoritesProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}

export default App;
