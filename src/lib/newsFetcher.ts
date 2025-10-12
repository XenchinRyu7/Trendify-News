export interface Article {
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  summary: string;
  imageUrl?: string;
}

export async function fetchHackerNews(): Promise<Article[]> {
  try {
    const topStoriesRes = await fetch(
      'https://hacker-news.firebaseio.com/v0/topstories.json'
    );
    const topStoryIds = await topStoriesRes.json();
    
    const stories = await Promise.all(
      topStoryIds.slice(0, 30).map(async (id: number) => {
        const storyRes = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        return storyRes.json();
      })
    );

    return stories
      .filter((story) => story.url)
      .map((story) => ({
        title: story.title,
        source: 'Hacker News',
        url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
        publishedAt: new Date(story.time * 1000).toISOString(),
        summary: story.text
          ? story.text.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
          : 'No description available',
      }));
  } catch (error) {
    console.error('Error fetching from Hacker News:', error);
    return [];
  }
}

export async function fetchNewsAPI(apiKey?: string): Promise<Article[]> {
  if (!apiKey) {
    console.warn('NewsAPI key not provided');
    return [];
  }

  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=30&apiKey=${apiKey}`
    );
    const data = await res.json();

    if (data.status !== 'ok') {
      console.error('NewsAPI error:', data.message);
      return [];
    }

    return data.articles.map((article: {
      title: string;
      source: { name: string };
      url: string;
      publishedAt: string;
      description?: string;
      urlToImage?: string;
    }) => ({
      title: article.title,
      source: article.source.name,
      url: article.url,
      publishedAt: article.publishedAt,
      summary: article.description || 'No description available',
      imageUrl: article.urlToImage,
    }));
  } catch (error) {
    console.error('Error fetching from NewsAPI:', error);
    return [];
  }
}

export async function fetchAllNews(): Promise<Article[]> {
  const hackerNews = await fetchHackerNews();
  const newsAPI = await fetchNewsAPI(process.env.NEWS_API_KEY);
  
  const allArticles = [...hackerNews, ...newsAPI];
  
  allArticles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return allArticles;
}
