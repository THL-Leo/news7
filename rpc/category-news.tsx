export default function CategoryNews({ category }: { category: string }) {
  // Query articles by category for today
  const articles = sql`
    SELECT 
      title, 
      source_name, 
      rank, 
      published_date,
      category,
      summary
    FROM articles 
    WHERE region = 'us' 
      AND published_date = CURRENT_DATE
      AND category = ${category}
    ORDER BY rank ASC
  ` as { title: string; source_name: string; rank: number; published_date: string | Date; category: string; summary?: string | null }[];

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          No {category} news available today
        </h3>
        <p className="text-gray-500">
          Check back later for the latest {category} stories
        </p>
      </div>
    );
  }

  const categoryEmojis: Record<string, string> = {
    business: '💼',
    technology: '🚀',
    politics: '🏛️',
    sports: '⚽',
    entertainment: '🎬',
    health: '🏥',
    general: '📰'
  };

  const categoryColors: Record<string, string> = {
    business: 'border-blue-200 bg-blue-50',
    technology: 'border-purple-200 bg-purple-50',
    politics: 'border-red-200 bg-red-50',
    sports: 'border-green-200 bg-green-50',
    entertainment: 'border-pink-200 bg-pink-50',
    health: 'border-emerald-200 bg-emerald-50',
    general: 'border-gray-200 bg-gray-50'
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {categoryEmojis[category] || '📰'} {category.charAt(0).toUpperCase() + category.slice(1)} News
        </h2>
        <p className="text-gray-600">
          Latest {category} stories from today
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <article 
            key={index}
            className={`p-6 rounded-lg border-2 ${categoryColors[category]} hover:shadow-lg transition-shadow cursor-pointer`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800 shadow-sm">
                #{article.rank}
              </span>
              <span className="text-xs text-gray-500">
                {article.source_name}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-3">
              {article.title}
            </h3>
            
            {article.summary && (
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {article.summary}
              </p>
            )}
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="capitalize">{article.category}</span>
              <span>{new Date(article.published_date).toLocaleDateString()}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center pt-6">
        <p className="text-sm text-gray-500">
          Showing {articles.length} {category} articles from today
        </p>
      </div>
    </div>
  );
}
