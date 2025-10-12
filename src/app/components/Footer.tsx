'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-16 sm:mt-20 py-8 text-center w-full flex justify-center"
    >
      <div className="w-full max-w-[1050px] px-4">
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8">
          <p className="text-gray-300 mb-3 text-sm sm:text-base">
            Built with <span className="text-purple-400 font-semibold">Next.js</span>, <span className="text-purple-400 font-semibold">Tailwind CSS</span>, and 💜
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mb-4">
            News sources: Hacker News & NewsAPI
          </p>
          <div className="flex justify-center gap-6 sm:gap-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
            >
              GitHub
            </a>
            <span className="text-gray-600">•</span>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
            >
              Vercel
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
