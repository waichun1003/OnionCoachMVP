import { NextResponse } from 'next/server'
import { Pool } from 'pg'
import { z } from 'zod'
import { Resend } from 'resend'
import { coachEmailTemplates } from '@/lib/email-templates/coach'

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
})

// Add this SQL to create the coaches table:
/*
CREATE TABLE IF NOT EXISTS coaches (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  linkedin_url VARCHAR(255),
  website VARCHAR(255),
  expertise TEXT[] NOT NULL,
  experience VARCHAR(50) NOT NULL,
  languages TEXT[] NOT NULL,
  timezone VARCHAR(50) NOT NULL,
  availability VARCHAR(50) NOT NULL,
  preferred_rate VARCHAR(50) NOT NULL,
  certifications TEXT[],
  bio TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE INDEX idx_coaches_email ON coaches(email);
CREATE INDEX idx_coaches_status ON coaches(status);
*/

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).substring(7)
  const startTime = Date.now()
  const metrics = { validation: 0, database: 0, email: 0 }
  
  console.log(`[${requestId}] Coach Application Started:`, {
    timestamp: new Date().toISOString(),
    url: req.url,
    method: req.method
  })
  
  const client = await pool.connect()
  
  try {
    const validationStart = Date.now()
    const body = await req.json()
    console.log(`[${requestId}] Raw request body:`, body)

    const validatedData = body
    metrics.validation = Date.now() - validationStart
    
    const dbStart = Date.now()
    await client.query('BEGIN')

    const result = await client.query(
      `INSERT INTO coaches (
        full_name,
        email,
        linkedin_url,
        website,
        expertise,
        experience,
        languages,
        timezone,
        availability,
        preferred_rate,
        certifications,
        bio,
        created_at,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), 'upcoming')
      RETURNING id`,
      [
        validatedData.fullName,
        validatedData.email,
        validatedData.linkedinUrl,
        validatedData.website,
        validatedData.expertise,
        validatedData.experience,
        validatedData.languages,
        validatedData.timezone,
        validatedData.availability,
        validatedData.preferredRate,
        validatedData.certifications || [],
        validatedData.bio
      ]
    )

    await client.query('COMMIT')
    metrics.database = Date.now() - dbStart
    
    // Email notifications
    if (resend) {
      const emailStart = Date.now()
      await resend.emails.send({
        from: 'Onion Coach <partners@onion.coach>',
        to: [validatedData.email],
        subject: 'Application Received - Onion Coach',
        html: coachEmailTemplates.coachConfirmation(validatedData)
      })

      await resend.emails.send({
        from: 'Onion Coach <partners@onion.coach>',
        to: ['team@onion.coach'],
        subject: `New Coach Application: ${validatedData.fullName}`,
        html: coachEmailTemplates.teamNotification(validatedData)
      })
      metrics.email = Date.now() - emailStart
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        id: result.rows[0].id,
        ...validatedData
      }
    })

  } catch (error: any) {
    await client.query('ROLLBACK')
    
    console.error(`[${requestId}] Error:`, {
      type: error.name,
      message: error.message,
      stack: error.stack
    })

    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to submit application'
      },
      { status: error.code === '23505' ? 409 : 500 }
    )
  } finally {
    client.release()
    console.log(`[${requestId}] Request completed in ${Date.now() - startTime}ms`)
  }
}