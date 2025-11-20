'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onSearch: (query: string) => void;
  lastUpdated?: string;
}

export default function Header({ onSearch, lastUpdated }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 sm:mb-16 w-full"
    >
      <div className="text-center mb-10">
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold dark:text-white mb-4"
        >
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent drop-shadow-lg">
            Trendify
          </span>
        </motion.h1>
        <p className="dark:text-gray-300 text-base sm:text-lg mb-3">
          Your Daily Dose of Tech News
        </p>
        {lastUpdated && (
          <p className="dark:text-gray-300 text-xs sm:text-sm">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </p>
        )}
      </div>

      <div className="w-full flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative group w-full max-w-[1050px]"
        >
          <input
            type="text"
            placeholder="Search by title, source, or keywords..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-6 py-4 sm:py-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 dark:text-white placeholder-slate-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 focus:bg-white/10 transition-all duration-300 text-sm sm:text-base"
          />
          <svg
            className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 group-focus-within:text-sky-400 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </motion.div>
      </div>
    </motion.header>
  );
}
