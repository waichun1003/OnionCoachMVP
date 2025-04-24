import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoriesParam = searchParams.get('categories')
    const limit = 6

    if (!categoriesParam) {
      return NextResponse.json({ error: 'Categories parameter is required' }, { status: 400 })
    }

    // Parse categories and their scores
    const categories = categoriesParam.split(',')

    // Get 1-2 articles from each weak category
    const articlesPerCategory = Math.ceil(limit / categories.length)
    
    const articlesPromises = categories.map(category => 
      prisma.article.findMany({
        where: {
          status: 'active',
          category: category.trim()
        },
        orderBy: [
          { relevanceScore: 'desc' },
          { viewCount: 'desc' },
          { publishedAt: 'desc' }
        ],
        take: articlesPerCategory,
        select: {
          id: true,
          title: true,
          summary: true,
          imageUrl: true,
          category: true,
          readTime: true,
          url: true,
          publishedAt: true
        }
      })
    )

    const articlesByCategory = await Promise.all(articlesPromises)
    
    // Flatten and shuffle the articles to get a diverse mix
    const articles = articlesByCategory
      .flat()
      .sort(() => Math.random() - 0.5)
      .slice(0, limit)

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recommendations' },
      { status: 500 }
    )
  }
} 