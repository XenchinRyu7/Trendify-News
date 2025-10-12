import { fetchAllNews } from '../src/lib/newsFetcher';
import { saveArticles } from '../src/lib/articleStorage';

async function main() {
  try {
    console.log('🔍 Fetching latest tech news...');
    const articles = await fetchAllNews();
    console.log(`📰 Fetched ${articles.length} articles`);
    
    await saveArticles(articles);
    console.log('✨ Articles saved successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error fetching news:', error);
    process.exit(1);
  }
}

main();
