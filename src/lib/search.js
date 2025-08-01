export const searchTools = (tools, query) => {
  if (!query.trim()) return tools;

  const searchTerm = query.toLowerCase().trim();
  
  return tools.filter(tool => {
    const nameMatch = tool.name.toLowerCase().includes(searchTerm);
    const descriptionMatch = tool.description.toLowerCase().includes(searchTerm);
    const categoryMatch = tool.categories.some(category => 
      category.toLowerCase().includes(searchTerm)
    );
    const tagMatch = tool.tags.some(tag => 
      tag.toLowerCase().includes(searchTerm)
    );

    return nameMatch || descriptionMatch || categoryMatch || tagMatch;
  });
};

export const filterToolsByCategories = (tools, selectedCategories) => {
  if (selectedCategories.length === 0) return tools;

  return tools.filter(tool => 
    selectedCategories.some(category => 
      tool.categories.includes(category)
    )
  );
};

export const sortTools = (tools, sortBy = 'name') => {
  const sortedTools = [...tools];

  switch (sortBy) {
    case 'name':
      return sortedTools.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sortedTools.sort((a, b) => b.name.localeCompare(a.name));
    case 'free':
      return sortedTools.sort((a, b) => {
        if (a.isFree && !b.isFree) return -1;
        if (!a.isFree && b.isFree) return 1;
        return a.name.localeCompare(b.name);
      });
    case 'paid':
      return sortedTools.sort((a, b) => {
        if (!a.isFree && b.isFree) return -1;
        if (a.isFree && !b.isFree) return 1;
        return a.name.localeCompare(b.name);
      });
    case 'api':
      return sortedTools.sort((a, b) => {
        if (a.hasAPI && !b.hasAPI) return -1;
        if (!a.hasAPI && b.hasAPI) return 1;
        return a.name.localeCompare(b.name);
      });
    default:
      return sortedTools;
  }
}; 