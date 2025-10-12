import { NextResponse } from 'next/server';
import { fetchAllNews } from '@/lib/newsFetcher';
import { saveArticles } from '@/lib/articleStorage';

export async function GET() {
  try {
    const articles = await fetchAllNews();
    
    await saveArticles(articles);

    return NextResponse.json({
      success: true,
      count: articles.length,
      articles,
    });
  } catch (error) {
    console.error('Error in fetchNews API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}
