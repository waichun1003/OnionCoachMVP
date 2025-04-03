import { NextResponse } from 'next/server'
import { ArticleRecommender } from '@/lib/services/article-recommender'

export async function POST(request: Request) {
  const scores = await request.json()
  
  // Process assessment scores
  const recommender = new ArticleRecommender()
  const recommendations = await recommender.getRecommendations(scores)

  return NextResponse.json({
    scores,
    recommendations
  })
} 