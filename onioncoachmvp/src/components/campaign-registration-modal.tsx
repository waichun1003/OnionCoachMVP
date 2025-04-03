"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Send } from 'lucide-react'
import { toast } from 'sonner'

class Campaign {
  title: any;
}

interface RegistrationModalProps {
  campaign: Campaign
  onClose: () => void
}

export function CampaignRegistrationModal({ campaign, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/campaign/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          campaignId: campaign.title.toLowerCase().replace(/ /g, '-'),
          campaignTitle: campaign.title,
        }),
      })

      if (!response.ok) throw new Error('Registration failed')

      toast.success('Successfully registered for the campaign!')
      onClose()
    } catch (error) {
      toast.error('Failed to register. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
      >
        <Card className="w-full max-w-md relative">
          <CardContent className="p-6">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-normal mb-6">Join {campaign.title}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                />
              </div>

              <Button
                  type="submit"
                  className="w-full bg-[#E86C3A] hover:bg-[#D55C2A] text-white"
                  disabled={isSubmitting}
              >
                {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2" />
                      Registering...
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                      <Send className="w-5 h-5 mr-2" />
                      Register Now
                    </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
  )
} 