import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { coachEmailTemplates } from '@/lib/email-templates/coach'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import type { CoachData } from '@/types/coach'

// Configure runtime
export const runtime = 'nodejs'

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

// Coach application schema for validation
const coachApplicationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  linkedinUrl: z.string().transform(val => val || undefined),
  website: z.string().transform(val => val || undefined),
  expertise: z.array(z.string()),
  experience: z.string(),
  languages: z.array(z.string()),
  timezone: z.string(),
  availability: z.string(),
  preferredRate: z.string(),
  certifications: z.array(z.string()).optional(),
  bio: z.string().min(100)
}) satisfies z.ZodType<CoachData>

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).substring(7)
  const startTime = Date.now()
  const metrics = { validation: 0, database: 0, email: 0 }
  
  console.log(`[${requestId}] Coach Application Started:`, {
    timestamp: new Date().toISOString(),
    url: req.url,
    method: req.method
  })
  
  try {
    // Parse and validate request body
    const validationStart = Date.now()
    const body = await req.json()
    console.log(`[${requestId}] Raw request body:`, body)

    const validatedData = coachApplicationSchema.parse(body)
    metrics.validation = Date.now() - validationStart
    
    // Insert into database using Prisma
    const dbStart = Date.now()
    const coach = await prisma.coach.create({
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        linkedinUrl: validatedData.linkedinUrl,
        website: validatedData.website,
        expertise: validatedData.expertise,
        experience: validatedData.experience,
        languages: validatedData.languages,
        timezone: validatedData.timezone,
        availability: validatedData.availability,
        preferredRate: validatedData.preferredRate,
        certifications: validatedData.certifications || [],
        bio: validatedData.bio,
        status: 'upcoming'
      }
    })
    metrics.database = Date.now() - dbStart
    
    // Send email notifications
    if (resend) {
      const emailStart = Date.now()
      await Promise.all([
        resend.emails.send({
          from: 'Onion Coach <partners@onion.coach>',
          to: [validatedData.email],
          subject: 'Application Received - Onion Coach',
          html: coachEmailTemplates.coachConfirmation(validatedData)
        }),
        resend.emails.send({
          from: 'Onion Coach <partners@onion.coach>',
          to: ['team@onion.coach'],
          subject: `New Coach Application: ${validatedData.fullName}`,
          html: coachEmailTemplates.teamNotification(validatedData)
        })
      ])
      metrics.email = Date.now() - emailStart
    }

    console.log(`[${requestId}] Application completed successfully:`, {
      coachId: coach.id,
      metrics,
      totalTime: Date.now() - startTime
    })

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data: coach
    })

  } catch (error: any) {
    console.error(`[${requestId}] Error:`, {
      type: error.name,
      message: error.message,
      stack: error.stack
    })

    // Handle specific error types
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid application data',
          details: error.errors
        },
        { status: 400 }
      )
    }

    // Handle Prisma unique constraint violations
    if (error.code === 'P2002') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'A coach with this email already exists'
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to submit application'
      },
      { status: 500 }
    )
  }
}