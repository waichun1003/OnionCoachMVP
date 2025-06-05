import { NextRequest, NextResponse } from 'next/server'
import { ArticleScraper } from '@/lib/services/article-scraper'
import { scrapeArticles } from '@/lib/tasks/scrape-articles'

export async function POST(request: NextRequest) {
  try {
    // Check for deploy hook secret
    const url = new URL(request.url)
    const providedSecret = url.searchParams.get('secret')
    const expectedSecret = process.env.DEPLOY_HOOK_SECRET

    if (expectedSecret && providedSecret !== expectedSecret) {
      return NextResponse.json(
        { success: false, error: 'Invalid deploy hook secret' },
        { status: 401 }
      )
    }

    // Check if scraping should be skipped
    const skipScraping = url.searchParams.get('skip') === 'true'
    
    if (skipScraping) {
      console.log('🚀 Deploy hook triggered - scraping skipped per request')
      return NextResponse.json({
        success: true,
        message: 'Deploy hook processed - scraping skipped',
        timestamp: new Date().toISOString()
      })
    }

    console.log('🚀 Deploy hook triggered - starting post-deployment scraping...')

    // Run the scraping process
    const scraper = new ArticleScraper()
    const articles = await scrapeArticles(scraper)

    console.log(`✅ Post-deployment scraping completed. Processed ${articles.length} articles.`)

    return NextResponse.json({
      success: true,
      message: 'Post-deployment scraping completed successfully',
      articlesProcessed: articles.length,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Post-deployment scraping failed:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Post-deployment scraping failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Allow GET requests for easy testing
  return POST(request)
} 