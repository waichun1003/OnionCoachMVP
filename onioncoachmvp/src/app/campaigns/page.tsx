"use client"

import { useEffect, useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CampaignCard } from "@/components/campaign-card"
import { AnimatedSection } from "@/components/ui/animated-section"

interface Campaign {
  id: string
  title: string
  description: string
  coverImage: string | null
  coach: string
  startDate: string
  endDate: string
  maxParticipants: number
  currentParticipants: number
  duration: string
  sessions: number
  status: string
  tags: string[]  // This will receive campaign_goals
  targetAudience: string
  budget: string
  timeline: string
  preferredChannels: string[]
  messageStyle: string
  kpis: string[]
  eventLink: string | null
  createdAt: string
  updatedAt: string | null
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('/api/campaign')
        const data = await response.json()
        if (data.success) {
          setCampaigns(data.data)
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EDE6DC] via-white to-[#EDE6DC]/50">
      <NavBar />
      
      <main className="pt-32 pb-20">
        <AnimatedSection>
          <section className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-normal mb-6">
                Upcoming{" "}
                <span className="italic font-serif text-[#E86C3A]">Hero Journeys</span>
              </h1>
              <p className="text-xl text-gray-600">
                Join our transformative workshops and begin your hero's journey with expert guides
              </p>
            </div>

            {loading ? (
              <div className="text-center text-gray-600">Loading campaigns...</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {campaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} {...campaign} />
                ))}
              </div>
            )}
          </section>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  )
} 