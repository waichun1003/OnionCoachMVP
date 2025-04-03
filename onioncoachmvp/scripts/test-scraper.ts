import { ArticleScraper } from '@/lib/services/article-scraper'
import { prisma } from '@/lib/prisma'
import type { Article } from '@/types/article'

async function testScraper() {
  const scraper = new ArticleScraper()
  
  try {
    // Test with a specific source
    const testUrl = 'https://www.psychologytoday.com/intl/basics/positive-psychology'
    console.log(`Testing scraper with URL: ${testUrl}`)
    
    await scraper.scrapeAndStore(testUrl)
    console.log('Articles scraped and stored successfully')
    
    // Query and print results
    const articles = await prisma.article.findMany({
      select: {
        title: true,
        category: true,
        author: true,
        readTime: true,
        tags: true,
        summary: true
      },
      where: {
        sourceUrl: {
          contains: 'psychologytoday.com'
        }
      },
      take: 5 // Limit to 5 articles for readability
    })
    
    console.log('\nScraped articles:')
    articles.forEach((article: Article) => {
      console.log('\nTitle:', article.title)
      console.log('Category:', article.category)
      console.log('Author:', article.author)
      console.log('Read Time:', article.readTime, 'minutes')
      console.log('Tags:', article.tags)
      console.log('Summary:', article.summary)
    })
  } catch (error) {
    console.error('Scraping test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testScraper()