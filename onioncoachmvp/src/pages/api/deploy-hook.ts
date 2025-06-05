import type { NextApiRequest, NextApiResponse } from 'next'
import { ArticleScraper } from '@/lib/services/article-scraper'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests from Vercel deploy hooks
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify the request is from Vercel (optional security)
  const deployHookSecret = process.env.DEPLOY_HOOK_SECRET
  const providedSecret = req.headers['x-vercel-signature'] || req.query.secret
  
  if (deployHookSecret && providedSecret !== deployHookSecret) {
    return res.status(401).json({ error: 'Unauthorized - Invalid secret' })
  }

  try {
    console.log('🔄 Post-deployment scraping job triggered...')
    
    // Wait a bit to ensure deployment is fully complete
    await new Promise(resolve => setTimeout(resolve, 5000))
    
    const scraper = new ArticleScraper()
    const articles = await scraper.scrapeAndStore()
    
    console.log(`✅ Post-deployment scraping completed. ${articles.length} articles processed.`)
    
    res.status(200).json({
      success: true,
      message: 'Post-deployment scraping completed successfully',
      articlesProcessed: articles.length,
      timestamp: new Date().toISOString(),
      trigger: 'deployment'
    })
    
  } catch (error) {
    console.error('❌ Post-deployment scraping failed:', error)
    
    res.status(500).json({
      success: false,
      error: 'Post-deployment scraping failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      trigger: 'deployment'
    })
  }
} 