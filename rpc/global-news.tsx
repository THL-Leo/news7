export default function GlobalNews() {
  const boundary = sql`
    WITH now_pt AS (
      SELECT (CURRENT_TIMESTAMP AT TIME ZONE 'America/Los_Angeles') AS now_pt
    )
    SELECT ((now_pt - INTERVAL '6 hours')::date + INTERVAL '6 hours') AS boundary_start
    FROM now_pt
  `;

  const articles = sql`
    SELECT 
      id, title, content, summary, source_name, source_url, 
      image_url, rank, published_date
    FROM articles 
    WHERE region = 'global' 
      AND created_at >= (${boundary})
    ORDER BY rank ASC
    LIMIT 7
  `;

  if (articles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 font-mono">No global news available for today.</p>
        <p className="text-sm text-gray-400 font-mono mt-2">News updates coming soon...</p>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .article-expansion {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .article-expansion[open] {
          background: rgba(59, 130, 246, 0.03);
          border-color: rgb(59, 130, 246);
          transform: scale(1.02);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .article-expansion[open] .article-summary {
          background: linear-gradient(135deg, rgb(59, 130, 246), rgb(37, 99, 235));
          color: white;
          transform: scale(1.05);
        }
        .article-expansion[open] .article-summary svg {
          transform: rotate(180deg) scale(1.2);
        }
        .article-content-overlay {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(59, 130, 246, 0.2);
          animation: slideDown 0.3s ease-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .reading-content {
          line-height: 1.8;
          font-size: 1.05rem;
          color: rgb(31, 41, 55);
        }
        @media (max-width: 768px) {
          .article-expansion[open] {
            transform: none;
            margin: 0 -1rem;
            border-radius: 0;
          }
        }
      `}</style>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🌍 Top Global News</h2>
        <div className="space-y-6">
          {articles.map((article: any) => (
            <details 
              key={article.id} 
              className="article-expansion group border border-gray-200 rounded-lg p-6 bg-white cursor-pointer"
            >
              <summary className="article-summary list-none p-4 -m-4 rounded-lg transition-all duration-300 ease-out hover:bg-blue-50">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-800 text-sm font-bold group-open:bg-white group-open:text-blue-600 transition-all">
                      {article.rank}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-open:text-white">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-base mb-4 leading-relaxed group-open:text-blue-100">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 group-open:text-blue-200">
                        <span className="font-medium">{article.source_name}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(article.published_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-blue-600 font-medium text-sm group-open:text-white">
                        <span className="mr-2">Read Full Article</span>
                        <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </summary>
              
              <div className="article-content-overlay mt-6 p-8 rounded-xl">
                <div className="max-w-none">
                  <div className="reading-content whitespace-pre-line text-gray-800 mb-6">
                    {article.content}
                  </div>
                  <div className="flex justify-start">
                    <a 
                      href={article.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Original Source
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </>
  );
} 