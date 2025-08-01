import React from 'react';
import { ExternalLink, Star, Code, Zap } from 'lucide-react';

const ToolCard = ({ tool }) => {
  const { name, description, url, categories, tags, isFree, hasAPI, image } = tool;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
            {image ? (
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {name.charAt(0).toUpperCase()}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              {isFree && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <Star className="w-3 h-3 mr-1" />
                  Безкоштовно
                </span>
              )}
              {hasAPI && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  <Code className="w-3 h-3 mr-1" />
                  API
                </span>
              )}
            </div>
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors group/link"
        >
          <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400" />
        </a>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
        {description}
      </p>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <span
            key={category}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
          >
            <Zap className="w-3 h-3 mr-1" />
            {getCategoryLabel(category)}
          </span>
        ))}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
              #{tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="inline-block px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              +{tags.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

const getCategoryLabel = (category) => {
  const labels = {
    text: 'Текст',
    image: 'Зображення',
    video: 'Відео',
    audio: 'Аудіо',
    chatbot: 'Чат-бот',
    pdf: 'PDF',
    code: 'Код',
    voice: 'Голос',
    fun: 'Розваги',
    research: 'Дослідження',
    productivity: 'Продуктивність',
    education: 'Освіта',
    marketing: 'Маркетинг',
    'open-source': 'Open Source'
  };
  return labels[category] || category;
};

export default ToolCard; 