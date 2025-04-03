import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET() {
  try {
    // Log the SQL query for debugging
    console.log('Fetching campaigns with event links...')
    
    const result = await pool.query(`
      SELECT 
        id,
        title,
        description,
        cover_image,
        coach,
        start_date,
        end_date,
        max_participants,
        current_participants,
        duration,
        sessions,
        status,
        campaign_goals,
        target_audience,
        budget,
        timeline,
        preferred_channels,
        message_style,
        kpis,
        event_link,
        created_at,
        updated_at
      FROM campaigns
      ORDER BY created_at DESC
    `)

    // Log the first row for debugging
    if (result.rows.length > 0) {
      console.log('First campaign row:', result.rows[0])
    }

    const campaigns = result.rows.map(campaign => ({
      id: campaign.id,
      title: campaign.title,
      description: campaign.description,
      coverImage: campaign.cover_image,
      coach: campaign.coach,
      startDate: campaign.start_date,
      endDate: campaign.end_date,
      maxParticipants: campaign.max_participants,
      currentParticipants: campaign.current_participants,
      duration: campaign.duration,
      sessions: campaign.sessions,
      status: campaign.status,
      tags: campaign.campaign_goals || [],
      targetAudience: campaign.target_audience,
      budget: campaign.budget,
      timeline: campaign.timeline,
      preferredChannels: campaign.preferred_channels,
      messageStyle: campaign.message_style,
      kpis: campaign.kpis,
      eventLink: campaign.event_link || null, // Ensure we're explicitly handling null case
      createdAt: campaign.created_at,
      updatedAt: campaign.updated_at
    }))

    // Log the first mapped campaign for debugging
    if (campaigns.length > 0) {
      console.log('First mapped campaign:', campaigns[0])
    }

    return NextResponse.json({
      success: true,
      data: campaigns
    })
  } catch (error) {
    console.error('Error fetching campaigns:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch campaigns' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const campaign = await pool.query(`
      INSERT INTO campaigns (
        title,
        description,
        cover_image,
        coach,
        start_date,
        end_date,
        max_participants,
        current_participants,
        duration,
        sessions,
        status,
        campaign_goals,
        target_audience,
        budget,
        timeline,
        preferred_channels,
        message_style,
        kpis,
        event_link,
        created_at,
        updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, NOW(), NOW()
      ) RETURNING id
    `, [
      data.title,
      data.description,
      data.coverImage || null,
      data.coach,
      new Date(data.startDate),
      new Date(data.endDate),
      data.maxParticipants,
      0, // current_participants starts at 0
      data.duration,
      data.sessions,
      'PENDING', // Set initial status as PENDING
      data.campaignGoals,
      data.targetAudience,
      data.budget,
      data.timeline,
      data.preferredChannels,
      data.messageStyle,
      data.kpis,
      data.eventLink || null
    ])

    return NextResponse.json({
      success: true,
      message: 'Campaign created successfully',
      data: { id: campaign.rows[0].id }
    })
  } catch (error) {
    console.error('Campaign creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create campaign' },
      { status: 500 }
    )
  }
}