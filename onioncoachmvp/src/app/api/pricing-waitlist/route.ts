import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, company, role, linkedIn, goals, selectedTier, submittedAt } = body

    // Create submission in database
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

    // Send confirmation email
    try {
      console.log("Sending confirmation email to:", email);
      
      const emailResult = await resend.emails.send({
        from: 'Onion Coach <noreply@onioncoach.com>',
        replyTo: 'onioncoach2024@gmail.com',
        to: email,
        subject: 'Thank you for joining our waitlist!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 5px;">
            <h2 style="color: #6B46C1;">Thank you for joining our waitlist, ${name}!</h2>
            
            <p>We're excited that you're interested in our ${selectedTier} package. We'll keep you updated about the latest developments and let you know when we launch.</p>
            
            <p>Here's a summary of your submission:</p>
            <ul>
              <li><strong>Package:</strong> ${selectedTier}</li>
              <li><strong>Goals:</strong> ${goals}</li>
            </ul>
            
            <p>If you have any questions or need additional information, feel free to reply to this email.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
              <p style="color: #666; font-size: 14px;">
                Best regards,<br>
                The Onion Coach Team
              </p>
            </div>
          </div>
        `
      });
      
      console.log("Email sent successfully:", emailResult);
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Log more details about the error
      if (emailError instanceof Error) {
        console.error('Error message:', emailError.message);
      }
      // Continue processing - don't fail the request just because email failed
    }

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