import { type Campaign } from '@/types/campaign'

// Helper functions for email templates
function getPriorityLevel(data: Campaign): string {
  if (data.budget.includes('50k+')) return 'HIGH'
  if (data.timeline.includes('1-3')) return 'URGENT'
  return 'NORMAL'
}

function getBudgetTier(budget: string): string {
  const tiers = {
    '0-5k': 'Basic',
    '5k-10k': 'Standard',
    '10k-50k': 'Professional',
    '50k+': 'Enterprise'
  }
  return tiers[budget as keyof typeof tiers] || 'Unknown'
}

export const campaignEmailTemplates = {
  userConfirmation: (data: Campaign, campaignId: number) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #E86C3A;">Thank you for submitting your campaign request</h1>
      <div style="background: #f7f7f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Campaign ID:</strong> ${campaignId}</p>
        <p><strong>Title:</strong> ${data.title}</p>
        <p><strong>Status:</strong> Under Review</p>
      </div>
      
      <h2>Campaign Details</h2>
      <ul style="list-style: none; padding: 0;">
        <li>🎯 Goals: ${data.campaignGoals.join(', ')}</li>
        <li>⏰ Timeline: ${data.timeline}</li>
        <li>💰 Budget Range: ${data.budget}</li>
        <li>🎨 Style: ${data.messageStyle}</li>
      </ul>
      
      <h2>Next Steps</h2>
      <ol>
        <li>Our team will review your campaign request</li>
        <li>We'll schedule a strategy call within 48 hours</li>
        <li>We'll create a detailed campaign proposal</li>
      </ol>
      
      <div style="background: #E86C3A; color: white; padding: 15px; border-radius: 8px; margin-top: 20px;">
        <p>Questions? Reply to this email or contact us at support@onion.coach</p>
      </div>
    </div>
  `,

  teamNotification: (data: Campaign, campaignId: number) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #E86C3A;">🚨 New Campaign Request</h1>
      <div style="background: #f7f7f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Campaign ID:</strong> ${campaignId}</p>
        <p><strong>Priority Level:</strong> ${getPriorityLevel(data)}</p>
        <p><strong>Budget Tier:</strong> ${getBudgetTier(data.budget)}</p>
      </div>

      <h2>Client Information</h2>
      <ul>
        <li><strong>Name:</strong> ${data.fullName}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Company:</strong> ${data.company || 'N/A'}</li>
        <li><strong>Role:</strong> ${data.role}</li>
      </ul>

      <h2>Campaign Requirements</h2>
      <div style="background: #f7f7f7; padding: 20px; border-radius: 8px;">
        <p><strong>Goals:</strong> ${data.campaignGoals.join(', ')}</p>
        <p><strong>Timeline:</strong> ${data.timeline}</p>
        <p><strong>Channels:</strong> ${data.preferredChannels.join(', ')}</p>
        <p><strong>Target Audience:</strong> ${data.targetAudience}</p>
      </div>

      <div style="margin-top: 20px;">
        <a href="https://onion.coach/admin/campaigns/${campaignId}" 
           style="background: #E86C3A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          View in Dashboard
        </a>
      </div>
    </div>
  `
} 