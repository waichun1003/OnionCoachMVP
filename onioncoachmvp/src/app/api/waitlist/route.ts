import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/email-templates/sendWelcomeEmail'
import { AssessmentResults } from '@/types/assessment'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Check if email already exists
    const existingEntry = await prisma.waitlist.findUnique({
      where: { email: body.email }
    })
    
    if (existingEntry) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    const { submittedAt, source, ...data } = body;
    const entry = await prisma.waitlist.create({
      data: {
        ...data,
        createdAt: new Date(),
        status: 'pending'
      }
    })
    
    return NextResponse.json(entry)
  } catch (error) {
    console.error('Error creating waitlist entry:', error)
    return NextResponse.json(
      { error: 'Failed to create waitlist entry' },
      { status: 500 }
    )
  }
}