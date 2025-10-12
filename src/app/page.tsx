'use client';

import { useEffect, useState } from 'react';
import { Article } from '@/lib/newsFetcher';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsCard from './components/NewsCard';
import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/fetchNews');
      const data = await res.json();
      
      if (data.success) {
        setArticles(data.articles);
        setFilteredArticles(data.articles);
        setLastUpdated(new Date().toISOString());
      }
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredArticles(articles);
      setCurrentPage(1);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowerQuery) ||
        article.summary.toLowerCase().includes(lowerQuery) ||
        article.source.toLowerCase().includes(lowerQuery)
    );
    setFilteredArticles(filtered);
    setCurrentPage(1);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/20 to-slate-900/20" />
      <div className="absolute inset-0 backdrop-blur-3xl" />
      
      <ThemeToggle />
      
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1">
          <Header onSearch={handleSearch} lastUpdated={lastUpdated} />

          <main className="w-full flex flex-col items-center">
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <div className="relative">
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-500/30"></div>
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-t-purple-500 absolute top-0 left-0"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <div className="inline-block px-6 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
                    <p className="text-gray-300 text-sm">
                      Showing <span className="font-semibold text-purple-400">{startIndex + 1}</span>-<span className="font-semibold text-purple-400">{Math.min(endIndex, filteredArticles.length)}</span> of <span className="font-semibold text-purple-400">{filteredArticles.length}</span> articles
                    </p>
                  </div>
                </div>

                <div className="w-full flex justify-center">
                  <div className="inline-grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">
                    {currentArticles.map((article, index) => (
                      <NewsCard key={startIndex + index} article={article} index={startIndex + index} />
                    ))}
                  </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Prev
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-xl backdrop-blur-xl border transition-all duration-300 ${
                            currentPage === page
                              ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                              : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-purple-500/30'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {filteredArticles.length === 0 && (
                  <div className="text-center py-32">
                    <div className="inline-block p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
                      <p className="text-gray-300 text-lg mb-2">No articles found</p>
                      <p className="text-gray-500 text-sm">Try a different search term</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
