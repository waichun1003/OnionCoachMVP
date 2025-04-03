import { NextResponse } from 'next/server'
import { ArticleScraper } from '@/lib/services/article-scraper'
import { scrapeArticles } from '@/lib/tasks/scrape-articles'

export async function POST() {
  try {
    const scraper = new ArticleScraper()
    const articles = await scrapeArticles(scraper)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Manual scraping completed',
      articlesProcessed: articles.length
    })
  } catch (error) {
    console.error('Manual scraping failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to scrape articles' },
      { status: 500 }
    )
  }
} 