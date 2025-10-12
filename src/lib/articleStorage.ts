import { Article } from './newsFetcher';
import fs from 'fs/promises';
import path from 'path';

const ARTICLES_DIR = path.join(process.cwd(), 'data', 'articles');

export async function saveArticles(articles: Article[]): Promise<void> {
  try {
    await fs.mkdir(ARTICLES_DIR, { recursive: true });

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `articles-${timestamp}.json`;
    const filepath = path.join(ARTICLES_DIR, filename);

    await fs.writeFile(filepath, JSON.stringify(articles, null, 2));
    
    const latestPath = path.join(ARTICLES_DIR, 'latest.json');
    await fs.writeFile(latestPath, JSON.stringify(articles, null, 2));

    console.log(`Saved ${articles.length} articles to ${filename}`);
  } catch (error: unknown) {
    console.error('Error saving articles:', error);
    throw error;
  }
}

export async function loadLatestArticles(): Promise<Article[]> {
  try {
    const latestPath = path.join(ARTICLES_DIR, 'latest.json');
    const data = await fs.readFile(latestPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    console.log('No cached articles found, will fetch fresh data');
    return [];
  }
}

export async function getAllArticleFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(ARTICLES_DIR);
    return files.filter((file) => file.endsWith('.json') && file !== 'latest.json');
  } catch {
    return [];
  }
}
