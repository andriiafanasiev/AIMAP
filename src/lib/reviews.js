import reviewsData from '../data/reviews.json';

export const getReviewsByToolId = (toolId) => {
  return reviewsData.filter(review => review.toolId === toolId);
};

export const getAverageRating = (toolId) => {
  const toolReviews = getReviewsByToolId(toolId);
  if (toolReviews.length === 0) return 0;
  
  const totalRating = toolReviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / toolReviews.length;
};

export const getReviewCount = (toolId) => {
  return getReviewsByToolId(toolId).length;
};

export const addReview = (review) => {
  // В реальному додатку тут був би API запит
  // Поки що просто додаємо до локального масиву
  const newReview = {
    ...review,
    id: Date.now().toString(),
    user: 'Anonymous User' // В реальному додатку був би авторизований користувач
  };
  
  reviewsData.push(newReview);
  return newReview;
};

export const getTopRatedTools = (limit = 5) => {
  const toolRatings = {};
  
  reviewsData.forEach(review => {
    if (!toolRatings[review.toolId]) {
      toolRatings[review.toolId] = {
        totalRating: 0,
        count: 0
      };
    }
    toolRatings[review.toolId].totalRating += review.rating;
    toolRatings[review.toolId].count += 1;
  });
  
  const averageRatings = Object.entries(toolRatings)
    .map(([toolId, data]) => ({
      toolId,
      averageRating: data.totalRating / data.count,
      reviewCount: data.count
    }))
    .filter(tool => tool.reviewCount >= 2) // Мінімум 2 відгуки
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, limit);
    
  return averageRatings;
}; 