import type { NextApiRequest, NextApiResponse } from 'next'
import { ArticleScraper } from '@/lib/services/article-scraper'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Security: Only allow POST requests and check for authorization
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Optional: Add API key protection
  const authHeader = req.headers.authorization
  const apiKey = process.env.SCRAPER_API_KEY
  
  if (apiKey && authHeader !== `Bearer ${apiKey}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    console.log('🚀 Starting article scraping job...')
    const scraper = new ArticleScraper()
    
    // Run the scraping job
    const articles = await scraper.scrapeAndStore()
    
    console.log(`✅ Scraping completed successfully. ${articles.length} articles processed.`)
    
    res.status(200).json({
      success: true,
      message: `Scraping completed successfully`,
      articlesProcessed: articles.length,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('❌ Scraping job failed:', error)
    
    res.status(500).json({
      success: false,
      error: 'Scraping job failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })
  }
} 