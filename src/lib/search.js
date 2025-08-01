// Простий fuzzy-пошук для AI-інструментів
export const searchTools = (tools, query) => {
  if (!query.trim()) return tools;
  
  const searchTerm = query.toLowerCase();
  
  return tools.filter(tool => {
    // Пошук по назві
    if (tool.name.toLowerCase().includes(searchTerm)) return true;
    
    // Пошук по опису
    if (tool.description.toLowerCase().includes(searchTerm)) return true;
    
    // Пошук по категоріях
    if (tool.categories.some(cat => cat.toLowerCase().includes(searchTerm))) return true;
    
    // Пошук по тегах
    if (tool.tags.some(tag => tag.toLowerCase().includes(searchTerm))) return true;
    
    return false;
  });
};

// Фільтрація по категоріях
export const filterByCategories = (tools, selectedCategories) => {
  if (selectedCategories.length === 0) return tools;
  
  return tools.filter(tool => 
    selectedCategories.some(category => 
      tool.categories.includes(category)
    )
  );
};

// Комбінована фільтрація та пошук
export const filterAndSearchTools = (tools, searchQuery, selectedCategories) => {
  let filteredTools = tools;
  
  // Спочатку фільтруємо по категоріях
  if (selectedCategories.length > 0) {
    filteredTools = filterByCategories(filteredTools, selectedCategories);
  }
  
  // Потім шукаємо
  if (searchQuery.trim()) {
    filteredTools = searchTools(filteredTools, searchQuery);
  }
  
  return filteredTools;
};

// Отримання унікальних категорій
export const getUniqueCategories = (tools) => {
  const categories = new Set();
  tools.forEach(tool => {
    tool.categories.forEach(category => categories.add(category));
  });
  return Array.from(categories).sort();
};

// Статистика
export const getToolsStats = (tools) => {
  const total = tools.length;
  const free = tools.filter(tool => tool.isFree).length;
  const withAPI = tools.filter(tool => tool.hasAPI).length;
  
  const categoryStats = {};
  tools.forEach(tool => {
    tool.categories.forEach(category => {
      categoryStats[category] = (categoryStats[category] || 0) + 1;
    });
  });
  
  return {
    total,
    free,
    withAPI,
    categoryStats
  };
}; 