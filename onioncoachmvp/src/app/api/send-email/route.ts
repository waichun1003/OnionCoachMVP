import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { WelcomeEmail } from '@/lib/email-templates/welcome-email'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received email request body:', body)

    const { to, name, assessmentResults } = body

    if (!to || !name || !assessmentResults) {
      console.error('Missing required fields:', { to, name, assessmentResults })
      return NextResponse.json(
        { error: 'Missing required fields', received: { to, name, assessmentResults } },
        { status: 400 }
      )
    }

    // Validate assessmentResults structure
    if (!assessmentResults.scores) {
      console.error('Invalid assessment results structure:', assessmentResults)
      return NextResponse.json(
        { error: 'Invalid assessment results structure' },
        { status: 400 }
      )
    }

    const token = crypto.randomBytes(32).toString('hex')

    await prisma.assessmentToken.create({
      data: {
        token,
        email: to,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        userId: body.userId // if available
      }
    })

    const data = await resend.emails.send({
      from: 'OnionCoach <notifications@onioncoach.com>',
      to: [to],
      subject: 'Welcome to Onion Coach - Your Assessment Results',
      react: WelcomeEmail({ 
        name,
        assessmentScores: assessmentResults.scores,
        personalityType: assessmentResults.personalityType,
        recommendedPath: assessmentResults.recommendedPath,
        strengths: assessmentResults.strengths || [],
        challenges: assessmentResults.challenges || [],
        resultId: body.userId || body.email || name.replace(/\s+/g, '-').toLowerCase(),
        // Add additional info for coaching session
        nextSteps: [
          "We'll be reaching out to arrange your free 1-on-1 coaching session",
          "Our coach will review your assessment results before the session",
          "You'll receive a calendar invite within the next 48 hours"
        ]
      })
    })

    console.log('Email sent successfully:', data)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const token = url.searchParams.get('token')
    
    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 400 }
      )
    }
    
    const tokenRecord = await prisma.assessmentToken.findUnique({
      where: { token }
    })

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error verifying token:', error)
    return NextResponse.json(
      { error: 'Failed to verify token', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
} 