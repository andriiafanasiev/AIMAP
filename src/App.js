import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';

function App() {
    return (
        <LanguageProvider>
            <div className="min-h-screen bg-black text-white">
                <Navbar />
                <Hero />
            </div>
        </LanguageProvider>
    );
}

export default App;
