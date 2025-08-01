import React from 'react';
import { X, ExternalLink, Tag, Zap, Code, DollarSign, Star } from 'lucide-react';

const ToolModal = ({ tool, isOpen, onClose }) => {
  if (!isOpen || !tool) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img 
                src={tool.image} 
                alt={tool.name}
                className="w-16 h-16 rounded-xl object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/64x64/6366f1/ffffff?text=AI';
                }}
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {tool.name}
                </h2>
                <div className="flex items-center space-x-2 mt-2">
                  {tool.isFree && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <DollarSign className="w-4 h-4 mr-1" />
                      Безкоштовно
                    </span>
                  )}
                  {tool.hasAPI && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      <Code className="w-4 h-4 mr-1" />
                      API
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Опис
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {tool.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Категорії
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.categories.map((category) => (
                  <span 
                    key={category}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  >
                    <Tag className="w-4 h-4 mr-1" />
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Теги
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ID: {tool.id}
                </span>
              </div>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Відвідати сайт
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolModal; 