import { 
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Link,
  Hr,
} from '@react-email/components'

interface WelcomeEmailProps {
  name: string;
  assessmentScores: Record<string, number>;
  personalityType?: string;
  recommendedPath?: string;
}

export function WelcomeEmail({ 
  name, 
  assessmentScores,
  personalityType = 'Balance Seeker',
  recommendedPath = 'Core Life Skills Foundation'
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Onion Coach - Your Personal Growth Journey Begins</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Onion Coach, {name}!</Heading>
          
          <Text style={text}>
            Thank you for completing the Life Wheel Assessment. We're excited to begin this journey with you!
          </Text>

          <Section style={scoreSection}>
            <Heading style={h2}>Your Assessment Results</Heading>
            <Text style={text}>
              Personality Type: <strong>{personalityType}</strong>
            </Text>
            <Text style={text}>
              Recommended Path: <strong>{recommendedPath}</strong>
            </Text>
            
            <Hr style={hr} />
            
            <Text style={text}>Your Life Wheel Scores:</Text>
            {Object.entries(assessmentScores).map(([category, score]) => (
              <Text key={category} style={scoreText}>
                {category}: {score}/10
              </Text>
            ))}
          </Section>

          <Section style={nextSteps}>
            <Heading style={h2}>Next Steps</Heading>
            <Text style={text}>
              Our team will review your assessment and get in touch with personalized recommendations 
              within the next 24-48 hours.
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            If you have any questions, feel free to reply to this email or contact us at{' '}
            <Link href="mailto:support@onioncoach.com" style={link}>
              support@onioncoach.com
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '16px 0',
}

const h2 = {
  color: '#444',
  fontSize: '20px',
  fontWeight: '500',
  lineHeight: '1.3',
  margin: '16px 0',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 0',
}

const scoreSection = {
  margin: '24px 0',
  padding: '24px',
  backgroundColor: '#f9f9f9',
  borderRadius: '6px',
}

const scoreText = {
  margin: '8px 0',
  fontSize: '15px',
  color: '#555',
}

const nextSteps = {
  margin: '32px 0',
}

const hr = {
  borderColor: '#eee',
  margin: '24px 0',
}

const footer = {
  color: '#666',
  fontSize: '14px',
  margin: '24px 0',
}

const link = {
  color: '#E86C3A',
  textDecoration: 'underline',
} 