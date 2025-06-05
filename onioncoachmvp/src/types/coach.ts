export interface CoachData {
  fullName: string
  email: string
  expertise: string
  experience: string
  linkedinUrl?: string
  website?: string
  bio: string
  availability: string
  preferredRate: string
  languages: string
  certifications?: string
  timezone: string
  profilePicture?: string
  status?: 'upcoming' | 'active' | 'rejected'
} 