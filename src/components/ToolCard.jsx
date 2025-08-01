import React from 'react';
import { ExternalLink, Tag, Zap, Code, DollarSign } from 'lucide-react';

const ToolCard = ({ tool }) => {
  const handleClick = () => {
    window.open(tool.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img 
            src={tool.image} 
            alt={tool.name}
            className="w-12 h-12 rounded-xl object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/48x48/6366f1/ffffff?text=AI';
            }}
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              {tool.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              {tool.isFree && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <DollarSign className="w-3 h-3 mr-1" />
                  Безкоштовно
                </span>
              )}
              {tool.hasAPI && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  <Code className="w-3 h-3 mr-1" />
                  API
                </span>
              )}
            </div>
          </div>
        </div>
        <ExternalLink className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
        {tool.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tool.categories.map((category) => (
          <span 
            key={category}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
          >
            <Tag className="w-3 h-3 mr-1" />
            {category}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-1">
        {tool.tags.slice(0, 3).map((tag) => (
          <span 
            key={tag}
            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          >
            <Zap className="w-3 h-3 mr-1" />
            {tag}
          </span>
        ))}
        {tool.tags.length > 3 && (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            +{tool.tags.length - 3}
          </span>
        )}
      </div>
    </div>
  );
};

export default ToolCard; 