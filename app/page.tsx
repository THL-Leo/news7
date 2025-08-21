import { Suspense } from "react";
import Navigation from "@/components/Navigation";
import USNews from "@/rpc/us-news";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Daily News | AI-Powered US News",
  description: "Stay informed with the top 7 most important US news stories, powered by AI and delivered fresh daily.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Today&apos;s US News
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The 7 most important stories from across the United States, curated by AI and updated daily
          </p>
        </div>

        <Suspense fallback={
          <div className="space-y-6">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-lg border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }>
          <USNews />
        </Suspense>
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2024 Daily News. Powered by AI and PostgreSQL.</p>
            <p className="mt-2">US news data sourced from NewsAPI. Stories ranked by AI importance scoring.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
