'use client'

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { WaitlistForm } from "./waitlist-form"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
  selectedTier?: "Professional Growth" | "Entrepreneur Elite" | "Enterprise Solutions"
}

export function WaitlistModal({ isOpen, onClose, selectedTier }: WaitlistModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-transparent border-none shadow-none max-w-2xl">
        <WaitlistForm 
          onClose={onClose}
          selectedTier={selectedTier}
        />
      </DialogContent>
    </Dialog>
  )
} 