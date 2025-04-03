"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Clock, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface CampaignCardProps {
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
  tags: string[]
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

export function CampaignCard(props: CampaignCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Log props for debugging
  console.log('Campaign card props:', {
    id: props.id,
    title: props.title,
    eventLink: props.eventLink
  });

  const handleLearnMore = () => {
    if (props.eventLink) {
      console.log('Opening event link:', props.eventLink);
      window.open(props.eventLink, '_blank', 'noopener,noreferrer');
    }
  };

  // Check if eventLink exists and is not an empty string
  const hasValidEventLink = props.eventLink && props.eventLink.trim().length > 0;

  return (
    <Card className="h-full overflow-hidden bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-100/50">
      <div className="relative h-[200px] w-full overflow-hidden">
        <Image
          src={props.coverImage || '/images/default-campaign.jpg'}
          alt={props.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 p-4 text-white">
          <span className="px-2 py-1 bg-[#E86C3A] rounded-full text-xs font-medium">
            {props.status === 'active' ? 'Active Campaign' : 'Upcoming Campaign'}
          </span>
          <h3 className="text-xl font-semibold mt-2">{props.title}</h3>
        </div>
      </div>

      <CardContent className="p-4">
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{props.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(props.startDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Limited to {props.maxParticipants} seats</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {props.tags && props.tags.map((tag, index) => (
            <Badge 
              key={index}
              variant="secondary" 
              className="bg-[#E86C3A]/10 text-[#E86C3A] hover:bg-[#E86C3A]/20"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex justify-end">
          <Button 
            variant="ghost"
            size="sm"
            className="text-[#E86C3A] hover:text-[#D55C2A] hover:bg-orange-50"
            onClick={handleLearnMore}
            disabled={!hasValidEventLink}
          >
            {hasValidEventLink ? (
              <>
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              'Coming Soon'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 