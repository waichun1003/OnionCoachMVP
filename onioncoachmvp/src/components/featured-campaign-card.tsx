"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"

interface FeaturedCampaignProps {
  campaign: {
    id: string
    title: string
    description: string
    coverImage?: string
    coach: string
    startDate: Date
    endDate: Date
    currentParticipants: number
    maxParticipants: number
    duration: string
    sessions: number
    status: string
    campaignGoals: string[]
    targetAudience: string
    budget: string
    timeline: string
    preferredChannels: string[]
    messageStyle: string
    kpis: string[]
    tags: string[]
  }
}

export function FeaturedCampaignCard({ campaign }: FeaturedCampaignProps) {
  if (!campaign) return null;

  return (
    <Card className="w-full overflow-hidden bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-100/50">
      <div className="relative h-[400px] w-full">
        <Image
          src={campaign.coverImage || '/images/default-campaign.jpg'}
          alt={campaign.title || 'Campaign Image'}
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute bottom-0 p-8 text-white">
          <span className="px-3 py-1 bg-[#E86C3A] rounded-full text-sm font-medium">
            Active Campaign
          </span>
          <h2 className="text-4xl font-semibold mt-4">{campaign.title}</h2>
          <p className="text-white/80 mt-3 text-lg">{campaign.description}</p>
        </div>
      </div>

      <div className="p-8 pb-6">
        <div className="grid grid-cols-3 gap-16">
          <div>
            <h3 className="text-lg font-medium mb-3">Campaign Details</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{campaign.startDate.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{campaign.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{campaign.currentParticipants}/{campaign.maxParticipants} participants</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {campaign.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Led by</h3>
            <p className="text-gray-600">{campaign.coach}</p>
            <Button 
              className="w-full bg-[#E86C3A] hover:bg-[#D55C2A] text-white mt-4"
              onClick={() => window.location.href = `/campaign/${campaign.id}`}
            >
              Join Campaign
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
} 