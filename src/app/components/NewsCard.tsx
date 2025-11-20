'use client';

import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '@/lib/newsFetcher';

interface NewsCardProps {
  article: Article;
  index: number;
}

export default function NewsCard({ article, index }: NewsCardProps) {
  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: "easeOut"
      }}
      className="group block w-full max-w-[350px] mx-auto"
    >
      <div className="relative h-full min-h-[400px] w-full rounded-3xl bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 !p-10 shadow-2xl hover:shadow-sky-500/20 hover:bg-white/10 hover:border-sky-500/30 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between gap-4 mb-6">
            <span className="inline-block px-3 py-1.5 text-xs font-semibold text-sky-300 bg-sky-500/20 rounded-full backdrop-blur-sm border border-sky-500/20">
              {article.source}
            </span>
            <span className="text-xs dark:text-gray-300 whitespace-nowrap pt-0.5">
              {formatDistanceToNow(new Date(article.publishedAt), {
                addSuffix: true,
              })}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold dark:text-white line-clamp-2 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors duration-300 leading-snug mb-5">
            {article.title}
          </h3>

          <p className="dark:text-gray-300 text-sm leading-relaxed line-clamp-3 flex-grow mb-6">
            {article.summary}
          </p>

          <div className="flex items-center text-sky-400 text-sm font-medium group-hover:text-sky-300 transition-colors mt-auto">
            Read article
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
