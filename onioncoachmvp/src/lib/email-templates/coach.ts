import { type CoachData } from '../../types/coach'

function getExperienceLevel(experience: string): string {
  const years = parseInt(experience)
  if (years >= 10) return 'Senior'
  if (years >= 5) return 'Mid-Level'
  return 'Junior'
}

export const coachEmailTemplates = {
  coachConfirmation: (data: CoachData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #E86C3A;">Thank you for applying to join Onion Coach</h1>
      <div style="background: #f7f7f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Status:</strong> Under Review</p>
      </div>
      
      <h2>Application Details</h2>
      <ul style="list-style: none; padding: 0;">
        <li>🎯 Expertise: ${data.expertise.join(', ')}</li>
        <li>⏰ Experience: ${data.experience} years</li>
        <li>🌍 Languages: ${data.languages.join(', ')}</li>
        <li>⏱️ Timezone: ${data.timezone}</li>
      </ul>
      
      <h2>Next Steps</h2>
      <ol>
        <li>Our team will review your application</li>
        <li>We'll schedule an interview within 5 business days</li>
        <li>We'll discuss onboarding and partnership details</li>
      </ol>
      
      <div style="background: #E86C3A; color: white; padding: 15px; border-radius: 8px; margin-top: 20px;">
        <p>Questions? Reply to this email or contact us at partners@onion.coach</p>
      </div>
    </div>
  `,

  teamNotification: (data: CoachData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #E86C3A;">🚨 New Coach Application</h1>
      <div style="background: #f7f7f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Experience Level:</strong> ${getExperienceLevel(data.experience)}</p>
        <p><strong>Rate Range:</strong> ${data.preferredRate}</p>
      </div>

      <h2>Coach Information</h2>
      <ul>
        <li><strong>Name:</strong> ${data.fullName}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>LinkedIn:</strong> ${data.linkedinUrl || 'N/A'}</li>
        <li><strong>Website:</strong> ${data.website || 'N/A'}</li>
      </ul>

      <h2>Qualifications</h2>
      <div style="background: #f7f7f7; padding: 20px; border-radius: 8px;">
        <p><strong>Expertise:</strong> ${data.expertise.join(', ')}</p>
        <p><strong>Experience:</strong> ${data.experience} years</p>
        <p><strong>Languages:</strong> ${data.languages.join(', ')}</p>
        <p><strong>Timezone:</strong> ${data.timezone}</p>
        ${data.certifications?.length ? 
          `<p><strong>Certifications:</strong> ${data.certifications.join(', ')}</p>` : 
          ''}
      </div>

      <h2>Bio</h2>
      <div style="background: #f7f7f7; padding: 20px; border-radius: 8px; margin-top: 20px;">
        <p>${data.bio}</p>
      </div>
    </div>
  `
} 