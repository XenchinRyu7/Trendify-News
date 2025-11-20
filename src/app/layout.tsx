import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trendify - Your Daily Dose of Tech News",
  description: "Stay updated with the latest technology news from Hacker News and top tech sources. Get your daily dose of trending tech stories, all in one place.",
  keywords: ["tech news", "technology", "hacker news", "trending", "daily tech updates", "programming news"],
  authors: [{ name: "Trendify" }],
  creator: "Trendify",
  publisher: "Trendify",
  metadataBase: new URL('https://xenchinryu7.github.io/Trendify-News'),
  openGraph: {
    title: "Trendify - Your Daily Dose of Tech News",
    description: "Stay updated with the latest technology news from Hacker News and top tech sources.",
    url: 'https://xenchinryu7.github.io/Trendify-News',
    siteName: 'Trendify',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logo.svg',
        width: 512,
        height: 512,
        alt: 'Trendify Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Trendify - Your Daily Dose of Tech News",
    description: "Stay updated with the latest technology news from Hacker News and top tech sources.",
    images: ['/logo.svg'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f0f9ff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
