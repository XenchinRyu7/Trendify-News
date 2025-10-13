import type { NextConfig } from "next";

// Configure for GitHub Pages static export
const isCI = process.env.GITHUB_ACTIONS === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'Trendify-News';

const nextConfig: NextConfig = {
  // Export as static site for GitHub Pages
  output: 'export',
  trailingSlash: true,
  images: {
    // GitHub Pages doesn't support Next Image optimization
    unoptimized: true,
  },
  // Prefix assets when deploying to GitHub Pages project site
  basePath: isCI ? `/${repoName}` : undefined,
  assetPrefix: isCI ? `/${repoName}/` : undefined,
};

export default nextConfig;
