import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, company, role, linkedIn, goals, selectedTier, submittedAt } = body

    const submission = await prisma.pricingWaitlist.create({
      data: {
        name,
        email,
        company,
        role,
        linkedinUrl: linkedIn,
        goals,
        selectedTier,
        submittedAt: new Date(submittedAt)
      }
    })

    return NextResponse.json(
      { message: 'Successfully joined waitlist', id: submission.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting to pricing waitlist:', error)
    return NextResponse.json(
      { error: 'Failed to submit to waitlist' },
      { status: 500 }
    )
  }
} 