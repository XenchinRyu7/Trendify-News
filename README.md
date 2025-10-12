# 🚀 Trendify - IT News Tracker

A modern, automated web app that fetches and displays the latest technology news from various sources with a stunning glassmorphism design.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 📰 **Auto-fetch News**: Automatically fetches the latest tech news from Hacker News and NewsAPI
- 🔍 **Smart Search**: Filter news by keywords, source, or content
- 🕶️ **Glassmorphism UI**: Modern, translucent cards with frosted glass effect
- 🎨 **Beautiful Gradients**: Indigo-purple-pink gradient background
- 🔄 **Auto-refresh**: GitHub Actions workflow fetches news every 6 hours
- 📱 **Fully Responsive**: Works perfectly on all devices
- ⚡ **Fast & Modern**: Built with Next.js 15 App Router and Turbopack
- 🎭 **Smooth Animations**: Framer Motion for delightful interactions

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Date Formatting**: [date-fns](https://date-fns.org/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📁 Project Structure

```
trendify/
├── .github/
│   └── workflows/
│       └── fetch-news.yml        # GitHub Actions workflow
├── data/
│   └── articles/                 # Auto-generated news articles
│       ├── latest.json
│       └── articles-YYYY-MM-DD.json
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
│   └── fetchNews.mjs             # Manual fetch script
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/trendify.git
cd trendify
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

## 🤖 GitHub Actions Setup

The app includes a GitHub Actions workflow that automatically fetches news every 6 hours and commits the updates.

### Setup Instructions:

1. **Enable GitHub Actions** in your repository settings

2. **Add NewsAPI Secret** (optional):
   - Go to Settings > Secrets and variables > Actions
   - Add a new secret: `NEWS_API_KEY`

3. **Enable workflow permissions**:
   - Go to Settings > Actions > General
   - Under "Workflow permissions", select "Read and write permissions"

The workflow will:
- Run every 6 hours (cron: `0 */6 * * *`)
- Fetch latest news articles
- Save them to `data/articles/`
- Commit and push changes automatically

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

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/trendify)

Or manually:

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variable: `NEWS_API_KEY` (optional)
4. Deploy!

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

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/trendify](https://github.com/yourusername/trendify)

---

⭐️ If you like this project, please give it a star!
