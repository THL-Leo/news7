import { Metadata } from 'next';
import CategoryNews from '@/rpc/category-news';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = params.category;
  const categoryNames: Record<string, string> = {
    business: 'Business',
    technology: 'Technology', 
    politics: 'Politics',
    sports: 'Sports',
    entertainment: 'Entertainment',
    health: 'Health & Science',
    general: 'General'
  };

  return {
    title: `${categoryNames[category] || 'Category'} News - Daily News`,
    description: `Latest ${categoryNames[category] || category} news and stories from today. Stay informed with the most recent developments.`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  
  // Validate category
  const validCategories = ['business', 'technology', 'politics', 'sports', 'entertainment', 'health', 'general'];
  if (!validCategories.includes(category)) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">
              The category "{category}" doesn't exist.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              ← Back to All News
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryNews category={category} />
      </div>
    </div>
  );
}
