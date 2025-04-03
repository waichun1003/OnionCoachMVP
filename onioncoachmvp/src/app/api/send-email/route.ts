import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { WelcomeEmail } from '@/lib/email-templates/welcome-email'

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

    const data = await resend.emails.send({
      from: 'OnionCoach <notifications@mail.onioncoach.com>',
      to: [to],
      subject: 'Welcome to Onion Coach - Your Assessment Results',
      react: WelcomeEmail({ 
        name,
        assessmentScores: assessmentResults.scores,
        personalityType: assessmentResults.personalityType,
        recommendedPath: assessmentResults.recommendedPath
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