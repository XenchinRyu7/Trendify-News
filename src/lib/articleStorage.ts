import { Article } from './newsFetcher';
import fs from 'fs/promises';
import path from 'path';

const ARTICLES_DIR = path.join(process.cwd(), 'data', 'articles');
const MAX_FILE_AGE_DAYS = 7; // Hapus file yang lebih dari 7 hari

/**
 * Hapus file artikel yang lebih tua dari MAX_FILE_AGE_DAYS
 */
async function cleanupOldArticles(): Promise<void> {
  try {
    const files = await fs.readdir(ARTICLES_DIR);
    const now = Date.now();
    const maxAge = MAX_FILE_AGE_DAYS * 24 * 60 * 60 * 1000; // Convert ke milliseconds

    for (const file of files) {
      // Skip latest.json dan .gitkeep
      if (file === 'latest.json' || file === '.gitkeep') continue;
      
      const filepath = path.join(ARTICLES_DIR, file);
      const stats = await fs.stat(filepath);
      const fileAge = now - stats.mtimeMs;

      if (fileAge > maxAge) {
        await fs.unlink(filepath);
        console.log(`🗑️  Deleted old file: ${file}`);
      }
    }
  } catch (error) {
    console.error('Error cleaning up old articles:', error);
  }
}

export async function saveArticles(articles: Article[]): Promise<void> {
  try {
    await fs.mkdir(ARTICLES_DIR, { recursive: true });

    // Simpan dengan timestamp lengkap (tanggal + jam) biar banyak file
    const now = new Date();
    const timestamp = now.toISOString().replace(/:/g, '-').split('.')[0]; // 2025-10-12T14-30-00
    const filename = `articles-${timestamp}.json`;
    const filepath = path.join(ARTICLES_DIR, filename);

    // Simpan file dengan timestamp
    await fs.writeFile(filepath, JSON.stringify(articles, null, 2));
    
    // Update latest.json
    const latestPath = path.join(ARTICLES_DIR, 'latest.json');
    await fs.writeFile(latestPath, JSON.stringify(articles, null, 2));

    console.log(`✅ Saved ${articles.length} articles to ${filename}`);
    
    // Cleanup file lama (delete otomatis yang >7 hari)
    await cleanupOldArticles();
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
