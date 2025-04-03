type EmailData = {
  to: string
  name: string
  assessmentScores: Record<string, number>
}

export async function sendWelcomeEmail(data: EmailData) {
  // TODO: Implement actual email sending logic
  console.log('Sending welcome email to:', data.to)
  return Promise.resolve()
}