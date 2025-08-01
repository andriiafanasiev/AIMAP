import React from 'react';
import { Navbar } from './components/Navbar';
import ToolsCatalog from './components/ToolsCatalog';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
                    <Navbar />
                    <ToolsCatalog />
                </div>
            </LanguageProvider>
        </ThemeProvider>
    );
}

export default App;
