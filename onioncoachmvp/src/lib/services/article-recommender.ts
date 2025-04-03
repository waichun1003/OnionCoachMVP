import { prisma } from '@/lib/prisma'

interface AssessmentScore {
  category: string
  score: number
}

export class ArticleRecommender {
  async getRecommendations(scores: AssessmentScore[]) {
    // Get categories with low scores (below 6)
    const lowScoreCategories = scores
      .filter(score => score.score < 6)
      .map(score => score.category)

    // Find relevant articles
    const articles = await prisma.article.findMany({
      where: {
        category: {
          in: lowScoreCategories
        }
      },
      orderBy: {
        relevanceScore: 'desc'
      },
      take: 3 // Return top 3 articles per category
    })

    return this.groupArticlesByCategory(articles)
  }

  private groupArticlesByCategory(articles: any[]) {
    return articles.reduce((acc, article) => {
      if (!acc[article.category]) {
        acc[article.category] = []
      }
      acc[article.category].push(article)
      return acc
    }, {})
  }
} 