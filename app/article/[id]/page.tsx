import { Suspense } from "react";
import Navigation from "@/components/Navigation";
import { db } from "@/db.mjs";
import { notFound } from "next/navigation";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

async function ArticleContent({ id }: { id: string }) {
  const articles = await db`
    SELECT 
      id,
      title, 
      content, 
      summary, 
      source_name, 
      source_url,
      image_url,
      rank,
      region,
      published_date,
      created_at
    FROM articles 
    WHERE id = ${parseInt(id)}
  `;

  const article = articles[0];

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article>
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-4">
            <span>🇺🇸 US News • Rank #{article.rank}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {article.summary}
          </p>

          <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
            <span className="text-sm font-medium text-gray-900">
              {article.source_name}
            </span>
            <a 
              href={article.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              View Original Source ↗
            </a>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-line text-gray-800 leading-relaxed">
            {article.content}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <a href="/" className="text-blue-600 hover:text-blue-500">← Back to News</a>
        </div>
      </article>
    </div>
  );
}

export default function ArticlePage({ params }: ArticlePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <Suspense fallback={
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse bg-white rounded-lg shadow-sm border p-8">
            <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-6 w-1/2"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      }>
        <ArticleContent id={params.id} />
      </Suspense>
    </div>
  );
}

export async function generateMetadata({ params }: ArticlePageProps) {
  try {
    const articles = await db`
      SELECT title, summary 
      FROM articles 
      WHERE id = ${parseInt(params.id)}
    `;
    
    const article = articles[0];
    
    if (article) {
      return {
        title: `${article.title} | Daily News`,
        description: article.summary,
      };
    }
  } catch (error) {
    console.error('Error fetching article for metadata:', error);
  }
  
  return {
    title: 'Article | Daily News',
    description: 'Read the full article with detailed coverage.',
  };
} 