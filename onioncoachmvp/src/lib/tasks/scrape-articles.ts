import { ArticleScraper } from '@/lib/services/article-scraper'
import { prisma } from '@/lib/prisma'
import { getRandomPlaceholderImage } from '@/lib/utils/placeholder-images'
import cron from 'node-cron'

let isScrapingInProgress = false

export function scheduleScraping() {
  console.log('Setting up article scraping schedule (daily at midnight)...')
  
  // Run daily at midnight
  const job = cron.schedule('0 0 * * *', async () => {
    if (isScrapingInProgress) {
      console.log('Scraping already in progress, skipping...')
      return
    }

    console.log('Starting scheduled article scraping...')
    const scraper = new ArticleScraper()
    try {
      isScrapingInProgress = true
      await scrapeArticles(scraper)
      console.log('Scheduled article scraping completed')
    } catch (error) {
      console.error('Scheduled article scraping failed:', error)
    } finally {
      isScrapingInProgress = false
    }
  }, {
    scheduled: true,
    timezone: "UTC"
  })

  // Start the job
  job.start()
  
  return job
}

async function scrapeArticles(scraper: ArticleScraper) {
  try {
    console.log('Starting article scraping...')
    const articles = await scraper.scrapeAndStore()
    if (!articles) return []
    
    // Process each article to ensure it has an image
    for (const article of articles) {
      let imageUrl = article.imageUrl

      // If no image was scraped or it's the logo, use a placeholder
      if (!imageUrl || 
          imageUrl.trim() === '' || 
          imageUrl.includes('logo_square_only') ||
          imageUrl.includes('logo')) {
        
        // Get a placeholder image based on category
        const placeholderImage = getRandomPlaceholderImage(article.category)
        
        // Update the article with the placeholder image
        await prisma.article.update({
          where: { id: article.id },
          data: { 
            imageUrl: placeholderImage,
            // Add a flag to indicate this is a placeholder
            tags: {
              set: [...(article.tags || []), 'placeholder_image']
            }
          }
        })
        
        console.log(`Added placeholder image for article: ${article.title}`)
      }
    }

    console.log('Scraping completed successfully')
    console.log(`Processed ${articles.length} articles`)
    return articles
  } catch (error) {
    console.error('Scraping failed:', error)
    return []
  } finally {
    await prisma.$disconnect()
  }
}

// Export the scrapeArticles function for manual execution if needed
export { scrapeArticles }