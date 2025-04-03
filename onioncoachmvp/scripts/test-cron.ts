import { ArticleScraper } from '@/lib/services/article-scraper'
import cron from 'node-cron'

console.log('Starting article scraping cron job test...')

const scraper = new ArticleScraper()

// Run immediately and then schedule
scraper.scrapeAndStore()
  .then(() => console.log('Initial scraping completed'))
  .catch(error => console.error('Initial scraping failed:', error))

// Schedule to run every 5 minutes for testing
cron.schedule('*/5 * * * *', async () => {
  console.log('\nRunning scheduled scraping...')
  try {
    await scraper.scrapeAndStore()
    console.log('Scheduled scraping completed successfully')
  } catch (error) {
    console.error('Scheduled scraping failed:', error)
  }
})

console.log('Cron job scheduled. Press Ctrl+C to exit.')