import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { articleId } = await request.json()

    if (!articleId) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400 }
      )
    }

    // Update article click count and other metrics
    await prisma.article.update({
      where: { id: articleId },
      data: {
        clickCount: { increment: 1 },
        // You might want to update other metrics like:
        // - recommendationCount
        // - relevanceScore
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking article click:', error)
    return NextResponse.json(
      { error: 'Failed to track article click' },
      { status: 500 }
    )
  }
} 