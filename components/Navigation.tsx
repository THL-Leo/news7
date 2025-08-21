"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Github, ChevronDown, Globe } from "lucide-react";

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

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              viewBox="0 0 69 43"
              className="text-blue-600"
            >
              <path d="m6.74 14.9 16.47-6.12 1.27-6.52A2.68 2.68 0 0 1 27.1.08h20.55c1.24 0 2.35.79 2.77 1.95l3.54 9.98 2.32-2.24a4.22 4.22 0 0 1 2.93-1.18h3.84c1.15 0 2.24.55 2.91 1.48l1.65 2.27c.74 1 .75 2.36.05 3.38l-.8 1.16a2.37 2.37 0 0 1-3.36.58l-2.17-1.58-3.7 5.07a3.18 3.18 0 0 1-3.08 1.27l-10.27-1.66-1.25 1.16v18.77a2.43 2.43 0 0 1-2.42 2.43h-5.64c-1.08 0-2.13-.4-2.93-1.14l-9.7-8.83-4.86 8.32a3.34 3.34 0 0 1-2.88 1.65H7.23a2.42 2.42 0 0 1-2.42-2.43v-9.14L1.46 28a2.21 2.21 0 0 1 .34-3.4l3.02-2.02v-4.92c0-1.23.77-2.34 1.92-2.78v.01ZM41 20.33l1.18-1.09-15.55-15.5-1.19 6.15-1.85 9.6 11.98 5.87 5.41-5.01.02-.02Zm7.17-17.5a.53.53 0 0 0-.5-.35H28.8l15.69 15.67 9.66 1.56-5.98-16.88ZM64.9 15.52l.8-1.15a.55.55 0 0 0 0-.6l-1.4-1.93-1.53 2.1 2.15 1.58h-.02ZM61.92 11h-2.7c-.46 0-.92.18-1.26.5l-3.12 3 1.48 4.17L61.91 11ZM33.68 40c.36.32.83.5 1.31.5l5.66-.03V23.94l-4.04 3.74c-.38.35-.92.41-1.35.2L21.7 21.22c-.5-.24-.76-.77-.65-1.3l1.62-8.4-14.39 5.35 25.4 23.11v.01Zm-26.44.5h7.38c.33 0 .64-.18.8-.46l5.11-8.76L7.21 19.15V40.5h.03ZM3.35 26.47l1.48 1.48v-2.47l-1.48.99Z" />
            </svg>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Daily News</h1>
              <p className="text-xs text-gray-500">US News Focus</p>
            </div>
          </Link>

          {/* Navigation - Category-based news navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {(() => {
              const pathname = usePathname();
              const isActive = (href: string) => pathname === href;
              const linkBase = "font-medium transition-colors";
              const inactive = "text-gray-700 hover:text-blue-600";
              const active = "text-blue-700 border-b-2 border-blue-600";
              return (
                <>
                  <Link
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
                  </Link>
                </>
              );
            })()}
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
              href="https://github.com/rauchg/react-postgres-components"
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