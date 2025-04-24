import { FC } from 'react';
import { 
  Html, 
  Body, 
  Container, 
  Heading, 
  Text, 
  Section, 
  Hr, 
  Link,
  Button,
  Img,
  Column,
  Row,
  Head,
  Preview
} from '@react-email/components';

interface AssessmentScores {
  [key: string]: number;
}

interface WelcomeEmailProps {
  name: string;
  assessmentScores: AssessmentScores;
  personalityType: string;
  recommendedPath: string;
  strengths?: string[];
  challenges?: string[];
  nextSteps?: string[];
  resultId?: string;
}

export const WelcomeEmail: FC<WelcomeEmailProps> = ({ 
  name, 
  assessmentScores,
  personalityType,
  recommendedPath,
  strengths = [],
  challenges = [],
  nextSteps = [],
  resultId
}) => {
  // Get the highest and lowest scores to highlight
  const scoreEntries = Object.entries(assessmentScores);
  
  const scoreText = {
    fontSize: '14px',
    margin: '8px 0',
    paddingLeft: '12px',
    borderLeft: '2px solid currentColor'
  };

  const subHeading = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '12px'
  };

  const section = {
    marginBottom: '24px'
  };

  const sectionHeading = {
    color: '#6B46C1',
    fontSize: '18px',
    marginBottom: '16px'
  };

  const text = {
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '12px'
  };

  const list = {
    paddingLeft: '20px',
    marginBottom: '16px'
  };

  const listItem = {
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '8px'
  };

  return (
    <Html>
      <Body style={{ 
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        margin: '0',
        padding: '0'
      }}>
        <Container style={{ 
          maxWidth: '600px', 
          margin: '0 auto', 
          backgroundColor: '#ffffff',
          border: '1px solid #e5e5e5',
          borderRadius: '5px',
          padding: '20px'
        }}>
          <Heading style={{ 
            color: '#6B46C1', 
            fontSize: '24px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            Your Onion Coach Assessment Results
          </Heading>
          
          <Text style={{ fontSize: '16px' }}>
            Hello {name},
          </Text>
          
          <Text style={{ fontSize: '16px', lineHeight: '1.5' }}>
            Thank you for completing your Onion Coach assessment. We're excited to share your results and begin your coaching journey.
          </Text>
          
          <Section style={{ 
            backgroundColor: '#f5f0ff', 
            padding: '15px', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <Heading as="h2" style={{ 
              color: '#6B46C1', 
              fontSize: '18px',
              marginBottom: '10px'
            }}>
              Your Personality Type: {personalityType}
            </Heading>
            
            <Text style={{ fontSize: '16px', lineHeight: '1.5' }}>
              Based on your responses, we've identified your personality type as <strong>{personalityType}</strong>.
              We recommend the <strong>{recommendedPath}</strong> approach for your growth journey.
            </Text>
          </Section>
          
          <Section style={section}>
            <Heading style={sectionHeading}>Your Life Balance Scores</Heading>
            <Text style={text}>Here's a detailed breakdown of your assessment results:</Text>
            
            <Section style={{ marginBottom: '20px' }}>
              <Heading as="h3" style={{ ...subHeading, color: '#22C55E' }}>Core Strengths (7-10)</Heading>
              {Object.entries(assessmentScores)
                .filter(([_, score]) => score >= 7)
                .map(([area, score]) => (
                  <Text key={area} style={{ ...scoreText, color: '#22C55E' }}>
                    {area}: {score}/10
                  </Text>
                ))
              }
            </Section>

            <Section style={{ marginBottom: '20px' }}>
              <Heading as="h3" style={{ ...subHeading, color: '#6366F1' }}>Growing Areas (5-6)</Heading>
              {Object.entries(assessmentScores)
                .filter(([_, score]) => score >= 5 && score < 7)
                .map(([area, score]) => (
                  <Text key={area} style={{ ...scoreText, color: '#6366F1' }}>
                    {area}: {score}/10
                  </Text>
                ))
              }
            </Section>

            <Section style={{ marginBottom: '20px' }}>
              <Heading as="h3" style={{ ...subHeading, color: '#EF4444' }}>Focus Areas (1-4)</Heading>
              {Object.entries(assessmentScores)
                .filter(([_, score]) => score < 5)
                .map(([area, score]) => (
                  <Text key={area} style={{ ...scoreText, color: '#EF4444' }}>
                    {area}: {score}/10
                  </Text>
                ))
              }
            </Section>
          </Section>
          
          <Section style={section}>
            <Heading style={sectionHeading}>Next Steps</Heading>
            <Text style={text}>Thank you for completing your assessment! As part of our exclusive beta program:</Text>
            <ul style={list}>
              <li style={listItem}>We'll review your assessment results carefully</li>
              <li style={listItem}>You'll receive a response within 5 business days</li>
              <li style={listItem}>If selected, we'll arrange a complimentary 1-on-1 coaching session</li>
            </ul>
          </Section>
          
          <Button
            href={`https://onioncoach.com/assessment/results?id=${encodeURIComponent(resultId || name.replace(/\s+/g, '-').toLowerCase())}`}
            style={{
              backgroundColor: '#6B46C1',
              color: '#FFFFFF',
              padding: '12px 20px',
              borderRadius: '4px',
              textDecoration: 'none',
              textAlign: 'center',
              display: 'block',
              width: '200px',
              margin: '20px auto'
            }}
          >
            View Full Results
          </Button>
          
          <Hr style={{ borderTop: '1px solid #E2E8F0', margin: '30px 0' }} />
          
          <Text style={{ 
            fontSize: '14px', 
            color: '#666666',
            textAlign: 'center'
          }}>
            If you have any questions, feel free to <Link href="mailto:onioncoach2024@gmail.com" style={{ color: '#6B46C1' }}>contact us</Link>.
          </Text>
          
          <Text style={{ 
            fontSize: '14px', 
            color: '#666666',
            textAlign: 'center'
          }}>
            Onion Coach Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}; 