import { Suspense } from "react";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import GlobalNews from "@/rpc/global-news";
import USNews from "@/rpc/us-news";
import { MapPin, Clock } from "lucide-react";

// Define available countries and their configurations
const countries = {
  global: {
    title: "Today's Global News",
    description: "The 7 most important stories from around the world, curated by AI and updated daily",
    component: GlobalNews,
    hasNews: true,
  },
  us: {
    title: "Today's US News", 
    description: "The 7 most important stories from across the United States, curated by AI and updated daily",
    component: USNews,
    hasNews: true,
  },
  canada: {
    title: "Canada News",
    description: "Coming Soon",
    emoji: "🇨🇦",
    color: "red",
    hasNews: false,
    details: [
      "Top 7 most important Canadian news stories daily",
      "AI-powered ranking of political, economic, and social news"
    ]
  },
  mexico: {
    title: "Mexico News",
    description: "Coming Soon", 
    emoji: "🇲🇽",
    color: "green",
    hasNews: false,
    details: [
      "Top 7 most important Mexican news stories daily",
      "AI-powered ranking of political, economic, and social news"
    ]
  }
} as const;

type CountryKey = keyof typeof countries;

interface PageProps {
  params: { country: string };
}

export default function CountryNewsPage({ params }: PageProps) {
  const { country } = params;
  
  // Check if country exists
  if (!(country in countries)) {
    notFound();
  }
  
  const countryKey = country as CountryKey;
  const config = countries[countryKey];
  
  if (config.hasNews) {
    // Render news page
    const NewsComponent = config.component!;
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {config.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {config.description}
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
            <NewsComponent />
          </Suspense>
        </main>

        <footer className="bg-white border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-500 text-sm">
              <p>© 2024 Daily News. Powered by AI and PostgreSQL.</p>
              <p className="mt-2">News data sourced from NewsAPI. Stories ranked by AI importance scoring.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  } else {
    // Render coming soon page
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <div className="mb-6">
              <div className={`p-4 bg-${config.color}-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center`}>
                <span className="text-4xl">{config.emoji}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{config.title}</h1>
              <p className="text-lg text-gray-600">{config.description}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">What to Expect</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                {config.details?.map((detail, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    {index === 0 ? (
                      <MapPin size={16} className={`text-${config.color}-600 mt-1 flex-shrink-0`} />
                    ) : (
                      <Clock size={16} className={`text-${config.color}-600 mt-1 flex-shrink-0`} />
                    )}
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-gray-500 text-sm">
              We're working on bringing you comprehensive coverage of {config.title.toLowerCase()}. 
              In the meantime, check out our <a href="/" className="text-blue-600 hover:text-blue-500 font-medium">Global News</a> section.
            </p>
          </div>
        </main>
      </div>
    );
  }
}

export function generateMetadata({ params }: PageProps) {
  const { country } = params;
  
  if (!(country in countries)) {
    return {
      title: "Country Not Found | Daily News",
      description: "The requested country page was not found.",
    };
  }
  
  const config = countries[country as CountryKey];
  
  if (config.hasNews) {
    return {
      title: `${config.title} | Daily News`,
      description: config.description,
    };
  } else {
    return {
      title: `${config.title} - Coming Soon | Daily News`,
      description: `${config.title.split(' ')[0]} news coverage coming soon to Daily News platform.`,
    };
  }
} 