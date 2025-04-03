export interface Campaign {
  role: string;
  company: string;
  email: string;
  fullName: string;
  id: string;
  title: string;
  description: string;
  coverImage: string | null;
  coach: string;
  startDate: Date;
  endDate: Date;
  maxParticipants: number;
  currentParticipants: number;
  duration: string;
  sessions: number;
  status: string;
  campaignGoals: string[];
  targetAudience: string;
  budget: string;
  timeline: string;
  preferredChannels: string[];
  messageStyle: string;
  kpis: string[];
  createdAt: Date;
  updatedAt: Date | null;
  tags: string[];
} 