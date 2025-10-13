# 🚀 Trendify - IT News Tracker

A modern, automated web app that fetches and displays the latest technology news with a stunning glassmorphism design. Now supports static export and automatic deployment to GitHub Pages.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-2088FF)

## ✨ Features

- 📰 **Auto-fetch News**: Automatically fetches the latest tech news from Hacker News and NewsAPI
- 🔍 **Smart Search**: Filter news by keywords, source, or content
- 🕶️ **Glassmorphism UI**: Modern, translucent cards with frosted glass effect
- 🎨 **Beautiful Gradients**: Indigo-purple-pink gradient background
- 🔄 **Auto-refresh**: GitHub Actions workflow fetches news every 3 hours
- � **Static Export**: Built as a static site, perfect for GitHub Pages
- �📱 **Fully Responsive**: Works perfectly on all devices
- ⚡ **Fast & Modern**: Built with Next.js 15 App Router and Turbopack
- 🎭 **Smooth Animations**: Framer Motion for delightful interactions

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Date Formatting**: [date-fns](https://date-fns.org/)
- **Deployment**: GitHub Pages (via Actions) or Vercel

## 📁 Project Structure

```
Trendify-News/
├── .github/
│   └── workflows/
│       ├── fetch-news.yml        # GitHub Actions: fetch & commit articles
│       └── deploy-pages.yml      # GitHub Actions: build & deploy to Pages
├── data/
│   └── articles/                 # Auto-generated news articles
│       ├── latest.json
│       └── articles-YYYY-MM-DDTHH-mm-SS.json
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── fetchNews/
│   │   │       └── route.ts      # API endpoint for fetching news
│   │   ├── components/
│   │   │   ├── Header.tsx        # Header with search
│   │   │   ├── Footer.tsx        # Footer component
│   │   │   └── NewsCard.tsx      # Glassmorphic news card
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Main page
│   └── lib/
│       ├── newsFetcher.ts        # News API integrations
│       └── articleStorage.ts     # Article file operations
├── scripts/
│   └── fetchNews.ts              # Manual fetch script (TypeScript via tsx)
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/XenchinRyu7/Trendify-News.git
cd Trendify-News
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables** (Optional)

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Add your NewsAPI key (optional - get one at [newsapi.org](https://newsapi.org)):

```env
NEWS_API_KEY=your_api_key_here
```

> **Note**: If you don't provide a NewsAPI key, the app will still work using only Hacker News as a source.

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run fetch-news` - Manually fetch latest news

## 🤖 Automation with GitHub Actions

This project includes two workflows located in `.github/workflows/`:

1) Fetch and commit latest news: `fetch-news.yml`
- Schedule: Every 3 hours (cron: `0 */3 * * *`)
- Reads optional `NEWS_API_KEY` from repository Secrets
- Saves articles into `data/articles/` and updates `latest.json`
- Commits with your GitHub username (uses `${{ github.actor }}`)

Setup:
- Settings → Secrets and variables → Actions → New repository secret → Name: `NEWS_API_KEY` (optional)
- Ensure repo has Actions workflow permissions to write contents (we set `permissions: contents: write` in workflow)

2) Build and deploy to GitHub Pages: `deploy-pages.yml`
- Triggers on push to `main` and on manual dispatch
- Builds static site to `out/` (`next.config.ts` uses `output: 'export'`)
- Uploads and deploys artifact to GitHub Pages

First-time Pages setup:
- Settings → Pages → Build and deployment → Source: GitHub Actions
- Your site will be available at: `https://xenchinryu7.github.io/Trendify-News/`

## 🎨 Customization

### Change News Sources

Edit `src/lib/newsFetcher.ts` to add or modify news sources:

```typescript
export async function fetchAllNews(): Promise<Article[]> {
  // Add your custom news sources here
  const hackerNews = await fetchHackerNews();
  const newsAPI = await fetchNewsAPI(process.env.NEWS_API_KEY);
  // ...
}
```

### Modify Colors

Update the gradient in `src/app/page.tsx`:

```tsx
<div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
```

### Adjust Glassmorphism Effect

Edit `src/app/globals.css`:

```css
.glassmorphism-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  /* Adjust these values */
}
```

## 🚢 Deployment

### Deploy to GitHub Pages (Recommended)

Automatic via Actions (already configured):
1. Push to `main`
2. Monitor Actions → `Deploy to GitHub Pages`
3. Visit: `https://xenchinryu7.github.io/Trendify-News/`

Notes:
- For Pages, the app uses static export with `basePath`/`assetPrefix` set from the repo name.
- During deploy, `data/articles/*.json` are copied to `public/data/articles/` so the site can fetch `latest.json` statically.

### Deploy to Vercel (Alternative)

You can still deploy to Vercel; just import the repo and set `NEWS_API_KEY` if needed.

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📊 News Sources

- **Hacker News**: Top tech stories from Y Combinator's community (no API key required)
- **NewsAPI**: Technology headlines from various sources (requires free API key)

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspired by modern glassmorphism trends
- News data provided by [Hacker News API](https://github.com/HackerNews/API) and [NewsAPI](https://newsapi.org/)
- Built with amazing open-source tools

## 📞 Contact

Maintained by [XenchinRyu7](https://github.com/XenchinRyu7)

Project Link: [https://github.com/XenchinRyu7/Trendify-News](https://github.com/XenchinRyu7/Trendify-News)

---

⭐️ If you like this project, please give it a star!
