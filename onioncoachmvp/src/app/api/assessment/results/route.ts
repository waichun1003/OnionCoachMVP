import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'No assessment ID provided' },
        { status: 400 }
      );
    }
    
    // Assuming you have a table/collection with assessment results
    // You might need to adjust this query based on your data model
    const assessment = await prisma.waitlist.findFirst({
      where: {
        OR: [
          { id: isNaN(Number(id)) ? undefined : Number(id) },
          { email: id.includes('@') ? id : undefined },
          { fullName: { contains: id, mode: 'insensitive' } }
        ]
      },
      select: {
        fullName: true,
        email: true,
        assessmentResults: true
      }
    });
    
    if (!assessment || !assessment.assessmentResults) {
      return NextResponse.json(
        { error: 'Assessment results not found' },
        { status: 404 }
      );
    }
    
    // @ts-ignore
    return NextResponse.json({
      success: true,
      results: {
        name: assessment.fullName,
        email: assessment.email,
        ...assessment.assessmentResults
      }
    });
    
  } catch (error) {
    console.error('Error retrieving assessment results:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve assessment results' },
      { status: 500 }
    );
  }
} 