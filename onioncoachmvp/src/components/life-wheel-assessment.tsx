"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight } from 'lucide-react'

export const lifeWheelCategories = [
  { id: "career", label: "Career & Work" },
  { id: "finance", label: "Finance & Wealth" },
  { id: "health", label: "Health & Fitness" },
  { id: "relationships", label: "Relationships" },
  { id: "personal", label: "Personal Growth" },
  { id: "fun", label: "Fun & Recreation" },
  { id: "Personal Growth", label: "Physical Personal Growth" },
  { id: "contribution", label: "Contribution" }
]

interface LifeWheelAssessmentProps {
  onComplete: (scores: Record<string, number>) => void
}

export function LifeWheelAssessment({ onComplete }: LifeWheelAssessmentProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [wheelScores, setWheelScores] = useState<Record<string, number>>(
    Object.fromEntries(lifeWheelCategories.map(cat => [cat.id, 5]))
  )
  const [userInfo, setUserInfo] = useState({ name: "" })
  const [feelings, setFeelings] = useState<string[]>([])
  const [emotionalStates, setEmotionalStates] = useState<Record<string, number>>({
    Energy: 50,
    Stress: 50,
    Appetite: 50
  })
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])

  const nextStep = () => {
    if (activeStep === 6) {
      onComplete(wheelScores)
    } else {
      setActiveStep(prev => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-[#EDE6DC]">
      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {activeStep === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center"
            >
              {/* Logo */}
              <div className="mb-16">
                <div className="flex items-center gap-2">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 24c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
                      fill="#8B5CF6"
                    />
                  </svg>
                  <span className="text-[#8B5CF6] text-2xl font-semibold">Onion</span>
                </div>
              </div>

              {/* Content */}
              <div className="max-w-2xl text-center space-y-6">
                <h1 className="text-[2.75rem] font-normal tracking-tight text-gray-900">
                  Life Wheel Assessment
                </h1>
                <p className="text-2xl italic font-serif text-gray-600">
                  A Self-Reflection Tool
                </p>
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
                  The Life Wheel is a powerful self-reflection tool designed to help you evaluate
                  key areas of your life and identify areas for growth and balance. By rating your
                  satisfaction in different aspects—such as career, health, relationships, and
                  personal growth—you can gain clarity on where you're thriving and where
                  adjustments may be needed. This questionnaire will guide you through an
                  honest evaluation of your current state, helping you create a roadmap for a
                  more fulfilling and balanced life.
                </p>
              </div>

              {/* Get Started Button */}
              <motion.div 
                className="mt-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  onClick={nextStep}
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-12 py-6 rounded-full text-lg font-normal"
                >
                  Get started
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5,
                      ease: "easeInOut"
                    }}
                  >
                    →
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* We'll add other steps here */}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <Button 
          size="lg" 
          onClick={nextStep}
          className="bg-[#E86C3A] hover:bg-[#D55C2A] text-white"
        >
          {activeStep === 6 ? 'Complete Assessment' : 'Next'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Screen indicators */}
      <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === activeStep ? "bg-[#E86C3A]" : "bg-gray-300"
            }`}
            onClick={() => setActiveStep(i)}
          />
        ))}
      </div>
    </div>
  )
} 