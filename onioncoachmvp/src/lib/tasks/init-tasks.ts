import { scheduleScraping, scrapeArticles } from './scrape-articles'
import { ArticleScraper } from '@/lib/services/article-scraper'

export async function initBackgroundTasks() {
  console.log('Initializing background tasks...')
  
  // 1. Set up the scheduled job (runs at midnight each day)
  console.log('Setting up scheduled scraping (runs at midnight UTC daily)')
  scheduleScraping()
  
  // 2. Run the scraping job immediately on startup
  console.log('Running immediate article scraping on startup...')
  try {
    const scraper = new ArticleScraper()
    const articles = await scrapeArticles(scraper)
    console.log(`Initial article scraping completed - processed ${articles.length} articles`)
  } catch (error) {
    console.error('Initial article scraping failed:', error)
  }
  
  console.log('Background tasks initialized successfully')
} 