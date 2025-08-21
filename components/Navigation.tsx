"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";

export default function Navigation() {
  // Commenting out navigation state for now to focus on US news
  // const [isAmericasOpen, setIsAmericasOpen] = useState(false);
  // const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // const handleMouseEnter = () => {
  //   if (timeoutRef.current) {
  //     clearTimeout(timeoutRef.current);
  //     timeoutRef.current = null;
  //   }
  //   setIsAmericasOpen(true);
  // };

  // const handleMouseLeave = () => {
  //   timeoutRef.current = setTimeout(() => {
  //     setIsAmericasOpen(false);
  //   }, 300); // 300ms delay before hiding
  // };

  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const linkBase = "font-medium transition-colors";
  const inactive = "text-gray-700 hover:text-blue-600";
  const active = "text-blue-700 border-b-2 border-blue-600";

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">N7</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Daily News</h1>
              <p className="text-xs text-gray-500">US News Focus</p>
            </div>
          </Link>

          {/* Navigation - Category-based news navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <>
              {/* <Link
                href="/"
                aria-current={isActive("/") ? "page" : undefined}
                className={`${linkBase} ${isActive("/") ? active : inactive}`}
              >
                All News
              </Link>
              <Link
                href="/category/business"
                aria-current={isActive("/category/business") ? "page" : undefined}
                className={`${linkBase} ${isActive("/category/business") ? active : inactive}`}
              >
                💼 Business
              </Link>
              <Link
                href="/category/technology"
                aria-current={isActive("/category/technology") ? "page" : undefined}
                className={`${linkBase} ${isActive("/category/technology") ? active : inactive}`}
              >
                🚀 Technology
              </Link>
              <Link
                href="/category/politics"
                aria-current={isActive("/category/politics") ? "page" : undefined}
                className={`${linkBase} ${isActive("/category/politics") ? active : inactive}`}
              >
                🏛️ Politics
              </Link>
              <Link
                href="/category/sports"
                aria-current={isActive("/category/sports") ? "page" : undefined}
                className={`${linkBase} ${isActive("/category/sports") ? active : inactive}`}
              >
                ⚽ Sports
              </Link>
              <Link
                href="/category/entertainment"
                aria-current={isActive("/category/entertainment") ? "page" : undefined}
                className={`${linkBase} ${isActive("/category/entertainment") ? active : inactive}`}
              >
                🎬 Entertainment
              </Link>
              <Link
                href="/category/health"
                aria-current={isActive("/category/health") ? "page" : undefined}
                className={`${linkBase} ${isActive("/category/health") ? active : inactive}`}
              >
                🏥 Health
              </Link> */}
            </>
            {/* <div className="relative">
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                <span>Americas</span>
                <ChevronDown size={16} className={`transition-transform ${isAmericasOpen ? 'rotate-180' : ''}`} />
              </button>

              {isAmericasOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border py-2 z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href="/countries/us"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <span className="mr-3">🇺🇸</span>
                    United States
                  </Link>
                  <Link
                    href="/countries/canada"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <span className="mr-3">🇨🇦</span>
                    Canada
                  </Link>
                  <Link
                    href="/countries/mexico"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <span className="mr-3">🇲🇽</span>
                    Mexico
                  </Link>
                </div>
              )}
            </div> */}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <span className="hidden sm:block text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'America/Los_Angeles'
              })}
            </span>
            <a
              href="https://github.com/THL-Leo/news7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
} 