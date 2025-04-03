import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const recommendations = await prisma.recommendation.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(recommendations);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch recommendations' },
      { status: 500 }
    );
  }
} 