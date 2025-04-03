import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/email-templates/sendWelcomeEmail'
import { AssessmentResults } from '@/types/assessment'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('Received form data:', data)
    console.log('Assessment Results:', data.assessmentResults)

    // Check for existing email
    const existingUser = await prisma.waitlist.findUnique({
      where: { email: data.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Test database connection
    try {
      await prisma.$queryRaw`SELECT 1`
      console.log('Database connection successful')
    } catch (e) {
      console.error('Database connection failed:', e)
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

    // Create waitlist entry with required fields
    const entry = await prisma.waitlist.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || null,
        role: data.role || "prospect",
        pricingTier: data.pricingTier || "free_assessment",
        company: data.company || null,
        industry: data.industry || null,
        companySize: data.companySize || null,
        experienceLevel: data.experienceLevel || null,
        coachingGoals: data.coachingGoals || [],
        preferredLanguage: data.preferredLanguage || 'English',
        location: data.location || null,
        heardFrom: data.heardFrom || null,
        budgetRange: data.budgetRange || null,
        startTimeline: data.startTimeline || null,
        status: 'pending',
        interests: data.interests || [],
        assessmentResults: data.assessmentResults || null
      }
    })

    console.log('Waitlist entry created:', entry)
    return NextResponse.json(entry)
  } catch (error) {
    console.error('Error creating waitlist entry:', error)
    return NextResponse.json(
      { error: 'Failed to create waitlist entry' },
      { status: 500 }
    )
  }
}