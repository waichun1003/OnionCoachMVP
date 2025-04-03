import { ArticleRecommender } from '@/lib/services/article-recommender'
import { prisma } from '@/lib/prisma'
import type { AssessmentScore, AssessmentResult } from '@/types/assessment'

async function testAssessment() {
  const recommender = new ArticleRecommender()
  
  // Sample assessment scores
  const testScores: AssessmentScore[] = [
    { category: 'Career Development', score: 6 },
    { category: 'Work-Life Balance', score: 4 },
    { category: 'Leadership', score: 8 },
    { category: 'Communication', score: 7 },
    { category: 'Personal Growth', score: 5 }
  ]

  try {
    console.log('Testing with scores:', testScores)
    
    const recommendations = await recommender.getRecommendations(testScores)
    
    console.log('\nRecommended articles:')
    recommendations.forEach((article: AssessmentResult) => {
      console.log('\nTitle:', article.title)
      console.log('Category:', article.category)
      console.log('Relevance Score:', article.relevanceScore)
      console.log('Tags:', article.tags)
    })

    // Test database connection
    const dbArticles = await prisma.article.count()
    console.log('\nTotal articles in database:', dbArticles)

  } catch (error) {
    console.error('Assessment test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAssessment()