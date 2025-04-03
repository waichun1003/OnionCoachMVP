import axios, { AxiosRequestConfig } from 'axios'
import * as cheerio from 'cheerio'
import { prisma } from '@/lib/prisma'
import type { CheerioAPI, Cheerio } from 'cheerio'
import type { Article } from '@prisma/client'

interface ScrapedArticle {
  title: string
  content: string
  url: string
  sourceUrl: string
  category: string
  summary: string
  description: string
  keywords: string[]
  imageUrl?: string
  author?: string
  readTime?: number
  publishedAt?: Date
  tags: string[]
  language: string
}

interface ArticleInput {
  title: string
  content: string
  url: string
  sourceUrl: string
  category: string
  summary: string
  description: string
  imageUrl: string
  author: string
  readTime: number
  tags: string[]
  language: string
  status: 'active'
  publishedAt: Date
}

// Add these constants at the top of the file
const MAX_TITLE_LENGTH = 255;
const MAX_CONTENT_LENGTH = 10000;
const MAX_SUMMARY_LENGTH = 500;
const MAX_DESCRIPTION_LENGTH = 255;
const MAX_AUTHOR_LENGTH = 100;

export class ArticleScraper {
  private readonly sources = [
    // VeryWellMind sources
    {
      url: 'https://www.verywellmind.com/strengthening-relationships-4162997',
      category: 'Romantic Life'
    },
    {
      url: 'https://www.verywellmind.com/dating-tips-and-strategies-7511571',
      category: 'Romantic Life'
    },
    {
      url: 'https://www.verywellmind.com/sex-and-relationships-7511610',
      category: 'Romantic Life'
    },
    {
      url: 'https://www.verywellmind.com/stress-management-overview-4581770',
      category: 'Health'
    },
    {
      url: 'https://www.verywellmind.com/meditation-and-mindfulness-4581783',
      category: 'Personal Growth'
    },
    {
      url: 'https://www.verywellmind.com/sleep-and-dreaming-4157166',
      category: 'Health'
    },
    {
      url: 'https://www.verywellmind.com/emotions-4157165',
      category: 'Personal Growth'
    },
    {
      url: 'https://www.verywellmind.com/self-improvement-4157212',
      category: 'Personal Growth'
    },
    
    // HBR sources
    {
      url: 'https://hbr.org/topic/subject/balancing-work-and-family',
      category: 'Family'
    },
    {
      url: 'https://hbr.org/topic/subject/entrepreneurial-business-strategy',
      category: 'Work'
    },
    {
      url: 'https://hbr.org/topic/subject/personal-growth-and-transformation',
      category: 'Personal Growth'
    },
    {
      url: 'https://hbr.org/topic/subject/mental-health',
      category: 'Health'
    },
    {
      url: 'https://hbr.org/topic/subject/health-and-wellness',
      category: 'Health'
    },

    // Greater Good Berkeley sources
    {
      url: 'https://greatergood.berkeley.edu/topic/relationships',
      category: 'Romantic Life'
    },
    {
      url: 'https://greatergood.berkeley.edu/topic/mind_body',
      category: 'Health'
    },
    {
      url: 'https://greatergood.berkeley.edu/topic/workplace',
      category: 'Work'
    },
    {
      url: 'https://greatergood.berkeley.edu/topic/parenting_family',
      category: 'Family'
    },
    {
      url: 'https://greatergood.berkeley.edu/topic/relationships',
      category: 'Romantic Life'
    }
  ]

  // Update selectors for different sites
  private readonly siteSelectors = {
    'verywellmind.com': {
      articleList: '.mntl-card-list-items',
      articleLink: 'a.comp.mntl-card-list-items',
      title: '.card__title-text',
      content: '.article__content',
      author: '.card__byline',
      imageUrl: '.card__media img',
      summary: '.card__content p'
    },
    'hbr.org': {
      articleList: '.stream-item',
      articleLink: '.hed a',
      title: '.hed',
      content: '.article-body',
      author: '.byline-list',
      imageUrl: '.stream-image img',
      summary: '.dek'
    },
    'greatergood.berkeley.edu': {
      articleList: '.article-card',
      articleLink: '.article-title a',
      title: '.article-title .title',
      content: '.article-content',
      author: '.article-meta a',
      imageUrl: '.article-image img',
      summary: '.article-content p'
    }
  }

  private getSelectors(url: string): any {
    if (url.includes('verywellmind.com')) {
      return this.siteSelectors['verywellmind.com']
    }
    if (url.includes('hbr.org')) {
      return this.siteSelectors['hbr.org']
    }
    if (url.includes('greatergood.berkeley.edu')) {
      return this.siteSelectors['greatergood.berkeley.edu']
    }
    return this.siteSelectors['verywellmind.com'] // default
  }

  private async scrapeSource(sourceUrl: string): Promise<void> {
    try {
      const response = await axios.get(sourceUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      const hostname = new URL(sourceUrl).hostname.replace('www.', '');
      const selectors = this.siteSelectors[hostname as keyof typeof this.siteSelectors];

      if (!selectors) {
        console.warn(`No selectors found for hostname: ${hostname}`);
        return;
      }

      // Get article URLs from the main listing
      const articleUrls = new Set<string>();
      
      // Find all articles in the list
      $(selectors.articleList).each((_, article) => {
        const $article = $(article);
        let href;
        
        // Handle direct link on article element (VeryWellMind)
        if (hostname === 'verywellmind.com') {
          href = $article.attr('href');
        } else {
          // Handle nested link (HBR and Greater Good)
          href = $article.find(selectors.articleLink).attr('href');
        }

        if (href) {
          const fullUrl = this.normalizeUrl(href, sourceUrl);
          if (!fullUrl.includes('/store.') && !fullUrl.includes('.pdf')) {
            articleUrls.add(fullUrl);
            console.log(`Found article: ${fullUrl}`);
          }
        }
      });

      console.log(`Found ${articleUrls.size} articles on ${sourceUrl}`);

      // Process each article URL
      const articleUrlArray = Array.from(articleUrls);
      for (const articleUrl of articleUrlArray) {
        try {
          const articleResponse = await axios.get(articleUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
          });
          const article$ = cheerio.load(articleResponse.data);
          
          // Extract article data using existing logic
          const defaultCategory = this.sources.find(s => s.url === sourceUrl)?.category || 'Personal Growth';
          const $articleEl = article$('body');  // Use body as the container for the article
          
          // Use your existing extraction logic here
          const scrapedArticle = this.extractArticleData($articleEl, articleUrl, article$);
          if (scrapedArticle) {
            await this.storeArticles([scrapedArticle]);
          }
        } catch (error) {
          console.error(`Error processing article ${articleUrl}:`, error);
          continue;
        }
      }

    } catch (error) {
      console.error(`Error scraping ${sourceUrl}:`, error);
      throw error;
    }
  }

  private getUserAgent(): string {
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
    ]
    return userAgents[Math.floor(Math.random() * userAgents.length)]
  }

  private async storeArticles(articles: ScrapedArticle[]): Promise<void> {
    for (const article of articles) {
      try {
        // Log field lengths before upsert
        console.log('Article field lengths:');
        console.log('URL:', article.url.length);
        console.log('Title:', article.title.length);
        console.log('Category:', article.category.length);
        console.log('Summary:', article.summary.length);
        console.log('Description:', article.description.length);
        console.log('Content:', article.content.length);
        console.log('ImageUrl:', article.imageUrl?.length);
        console.log('Author:', article.author?.length);
        console.log('SourceUrl:', article.sourceUrl.length);

        // Ensure all fields are properly truncated
        const sanitizedArticle = {
          ...article,
          title: this.truncateText(article.title, MAX_TITLE_LENGTH),
          content: this.truncateText(article.content, MAX_CONTENT_LENGTH),
          url: this.truncateText(article.url, MAX_TITLE_LENGTH),
          sourceUrl: this.truncateText(article.sourceUrl, MAX_TITLE_LENGTH),
          category: this.truncateText(article.category, 50),
          summary: this.truncateText(article.summary, MAX_SUMMARY_LENGTH),
          description: this.truncateText(article.description, MAX_DESCRIPTION_LENGTH),
          imageUrl: article.imageUrl ? this.truncateText(article.imageUrl, 1000) : undefined,
          author: article.author ? this.truncateText(article.author, MAX_AUTHOR_LENGTH) : undefined,
          keywords: article.keywords.map(k => this.truncateText(k, 50)).slice(0, 10),
          tags: article.tags.map(t => this.truncateText(t, 50)).slice(0, 10),
          language: this.truncateText(article.language, 10)
        };

        await prisma.article.upsert({
          where: { url: sanitizedArticle.url },
          update: sanitizedArticle,
          create: {
            ...sanitizedArticle,
            status: 'active',
            relevanceScore: 1.0,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });
      } catch (error) {
        // Type guard for error object
        if (error instanceof Error) {
          console.error('Error storing article:', {
            url: article.url,
            error: error.message,
            meta: (error as any).meta // Cast to any for accessing meta property
          });
        } else {
          console.error('Error storing article:', {
            url: article.url,
            error: 'Unknown error occurred'
          });
        }
        throw error;
      }
    }
  }

  private determineCategory(url: string, title: string, content: string): string {
    // Try to find category from content and title
    const text = (title + ' ' + content).toLowerCase()
    
    if (text.includes('relationship') || text.includes('dating')) {
      return 'Romantic Life'
    } else if (text.includes('health') || text.includes('wellness')) {
      return 'Health and Fitness'
    } else if (text.includes('work') || text.includes('career')) {
      return 'Work'
    } else if (text.includes('family') || text.includes('parenting')) {
      return 'Family'
    } else if (text.includes('growth') || text.includes('development')) {
      return 'Personal Growth'
    }
    
    // Default category based on URL
    if (url.includes('relationships')) return 'Romantic Life'
    if (url.includes('health')) return 'Health and Fitness'
    if (url.includes('work')) return 'Work'
    if (url.includes('family')) return 'Family'
    
    return 'Personal Growth'
  }

  private extractArticleData($el: Cheerio<any>, sourceUrl: string, $: CheerioAPI): ScrapedArticle | null {
    try {
      const selectors = this.getSelectors(sourceUrl);
      const title = $el.find(selectors.title).first().text().trim();
      const content = $el.find(selectors.content).text().trim();
      const author = $el.find(selectors.author).text().trim();
      const imageUrl = $el.find(selectors.imageUrl).attr('src');

      if (!title || !content) return null;

      return {
        title,
        content,
        url: this.generateInternalUrl(title),
        sourceUrl,
        category: this.determineCategory(sourceUrl, title, content),
        summary: content.substring(0, 200) + '...',
        description: content.substring(0, 150) + '...',
        keywords: this.extractKeywords(content),
        imageUrl: imageUrl ? this.normalizeUrl(imageUrl, sourceUrl) : undefined,
        author: author || undefined,
        readTime: this.estimateReadTime(content),
        publishedAt: new Date(),
        tags: this.extractTags($),
        language: 'en'
      };
    } catch (error) {
      console.error('Error extracting article data:', error);
      return null;
    }
  }

  private generateInternalUrl(title: string): string {
    return `/articles/${encodeURIComponent(
      title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    )}`
  }

  private estimateReadTime(content: string): number {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  private extractTags($: CheerioAPI): string[] {
    const tags = new Set<string>()
    $('.tag, .category, .topic').each((_, el) => {
      const tag = $(el).text().trim().toLowerCase()
      if (tag) tags.add(tag)
    })
    return Array.from(tags)
  }

  private extractKeywords(content: string): string[] {
    const words = content.toLowerCase().split(/\W+/)
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to'])
    return Array.from(new Set(
        words
            .filter(word => word.length > 3 && !stopWords.has(word))
            .slice(0, 10)
    ))
  }

  private normalizeUrl(url: string, baseUrl: string): string {
    try {
      // If the URL is already absolute, return it
      if (url.startsWith('http')) {
        return url;
      }
      // Otherwise, construct an absolute URL using the base URL
      return new URL(url, baseUrl).toString();
    } catch (error) {
      console.error('Error normalizing URL:', error);
      return url; // Return the original URL if normalization fails
    }
  }

  async scrapeArticle(url: string): Promise<ArticleInput> {
    try {
      const response = await axios.get(url)
      const $ = cheerio.load(response.data)
      
      const title = $('h1').first().text().trim()
      const content = $('.article__content').text().trim()
      const summary = $('meta[name="description"]').attr('content') || ''
      const description = summary
      const author = $('.author-name').text().trim()
      const category = this.determineCategory(url, title, content)
      const readTime = this.estimateReadTime(content)
      const tags = this.extractTags($)
      
      // Get the main article image
      let imageUrl = ''
      if (url.includes('greatergood.berkeley.edu')) {
        const mainImage = $('img[alt*="Man"][alt*="woman"], img[alt*="couple"], img[alt*="family"], img[alt*="people"]').first()
        if (mainImage.length) {
          imageUrl = mainImage.attr('src') ?? mainImage.attr('srcset')?.split(',')[0]?.trim() ?? ''
          if (imageUrl?.includes(' ')) {
            imageUrl = imageUrl.split(' ')[0] ?? ''
          }
        }
      }

      return {
        title,
        content,
        url,
        sourceUrl: url,
        category,
        summary,
        description,
        imageUrl,
        author,
        readTime,
        tags,
        language: 'en',
        status: 'active',
        publishedAt: new Date(),
      }
    } catch (error) {
      console.error('Error scraping article:', error)
      throw error
    }
  }

  private async scrapeArticles(): Promise<ArticleInput[]> {
    const articles: ArticleInput[] = []
    for (const source of this.sources) {
      try {
        const article = await this.scrapeArticle(source.url)
        articles.push(article)
      } catch (error) {
        console.error(`Error scraping ${source.url}:`, error)
      }
    }
    return articles
  }

  async scrapeAndStore(): Promise<Article[]> {
    try {
      const scrapedArticles: ArticleInput[] = [];
      
      // Process each source URL using the new scrapeSource method
      for (const source of this.sources) {
        console.log(`Processing source: ${source.url}`);
        try {
          const response = await axios.get(source.url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
          });

          const $ = cheerio.load(response.data);
          const hostname = new URL(source.url).hostname.replace('www.', '');
          const selectors = this.siteSelectors[hostname as keyof typeof this.siteSelectors];

          if (!selectors) {
            console.warn(`No selectors found for hostname: ${hostname}`);
            continue;
          }

          // Find all articles in the list
          $(selectors.articleList).each((_, article) => {
            const $article = $(article);
            let href;
            
            // Handle direct link on article element (VeryWellMind)
            if (hostname === 'verywellmind.com') {
              href = $article.attr('href');
            } else {
              // Handle nested link (HBR and Greater Good)
              href = $article.find(selectors.articleLink).attr('href');
            }

            if (href) {
              const fullUrl = this.normalizeUrl(href, source.url);
              if (!fullUrl.includes('/store.') && !fullUrl.includes('.pdf')) {
                // Extract article data
                const title = $article.find(selectors.title).text().trim();
                const content = $article.find(selectors.content).text().trim();
                const author = $article.find(selectors.author).text().trim();
                const imageUrl = $article.find(selectors.imageUrl).attr('src');
                const summary = $article.find(selectors.summary).text().trim();

                if (title) {
                  const articleData: ArticleInput = {
                    title,
                    content: content || summary,
                    url: fullUrl,
                    sourceUrl: source.url,
                    category: source.category,
                    summary: summary || content?.substring(0, 200) + '...',
                    description: summary || content?.substring(0, 150) + '...',
                    imageUrl: imageUrl ? this.normalizeUrl(imageUrl, source.url) : '',
                    author: author || 'Unknown',
                    readTime: this.estimateReadTime(content || summary),
                    tags: this.extractTags($),
                    language: 'en',
                    status: 'active',
                    publishedAt: new Date()
                  };
                  scrapedArticles.push(articleData);
                  console.log(`Found article: ${title}`);
                }
              }
            }
          });

        } catch (error: unknown) {
          // Type guard for error object
          if (error instanceof Error) {
            console.error(`Error processing source ${source.url}:`, error.message);
          } else {
            console.error(`Error processing source ${source.url}:`, String(error));
          }
        }
      }

      console.log(`Total articles found: ${scrapedArticles.length}`);

      // Before creating the articles, sanitize the data
      const sanitizedArticles = scrapedArticles.map(article => ({
        ...article,
        title: this.truncateText(article.title, MAX_TITLE_LENGTH),
        content: this.truncateText(article.content, MAX_CONTENT_LENGTH),
        summary: this.truncateText(article.summary, MAX_SUMMARY_LENGTH),
        description: this.truncateText(article.description, MAX_DESCRIPTION_LENGTH),
        author: this.truncateText(article.author, MAX_AUTHOR_LENGTH),
      }));

      // Store articles in database
      if (sanitizedArticles.length > 0) {
        const result = await prisma.article.createMany({
          data: sanitizedArticles,
          skipDuplicates: true,
        });

        console.log(`Stored ${result.count} articles in database`);

        // Return the newly created articles
        return await prisma.article.findMany({
          where: {
            url: {
              in: sanitizedArticles.map(a => a.url)
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
      }

      return [];
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error in scrapeAndStore:', error.message);
      } else {
        console.error('Error in scrapeAndStore:', String(error));
      }
      return [];
    }
  }

  private truncateText(text: string | undefined | null, maxLength: number): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
  }

  private enhanceImageUrl(url: string): string {
    try {
      const imageUrl = new URL(url);
      
      // Handle common CDN parameters
      if (url.includes('w=') || url.includes('width=')) {
        // Replace width parameter with larger value
        url = url.replace(/w=\d+/g, 'w=1200')
           .replace(/width=\d+/g, 'width=1200');
      }
      
      // Handle specific domains
      if (imageUrl.hostname.includes('greatergood.berkeley.edu')) {
        // Remove any size constraints
        url = url.replace(/-\d+x\d+\./, '.');
      }
      
      // Add quality parameters if needed
      if (!url.includes('q=') && !url.includes('quality=')) {
        url += (url.includes('?') ? '&' : '?') + 'q=85';
      }
      
      return url;
    } catch (error) {
      console.warn('Error enhancing image URL:', error);
      return url;
    }
  }
}