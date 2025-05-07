"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { X, Rocket, Target, Calendar, MessageSquare, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import confetti from 'canvas-confetti'
import { useModal } from "@/components/ui/modal-context"

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: { value: string; label: string; description: string; }[] | string[];
}

const formSteps: Array<{
  title: string;
  subtitle: string;
  icon: any;
  fields: FormField[];
}> = [
  {
    title: "Campaign Basics",
    subtitle: "Let's start with the fundamentals",
    icon: Rocket,
    fields: [
      { name: "campaignName", label: "Campaign Name", type: "text", placeholder: "Enter a catchy name for your Onion campaign" },
      { name: "campaignType", label: "Campaign Type", type: "radio", options: [
          { value: "challenge", label: "Onion Challenge", description: "Create an engaging multi-day challenge" },
          { value: "webinar", label: "Webinar Series", description: "Host interactive online sessions on Onion" },
          { value: "course", label: "Online Course", description: "Develop a comprehensive course on Onion" },
          { value: "coaching", label: "Group Coaching", description: "Offer group coaching sessions via Onion" }
        ]},
    ],
  },
  {
    title: "Target Audience",
    subtitle: "Define your perfect Onion audience",
    icon: Target,
    fields: [
      { name: "targetAudience", label: "Describe your ideal audience", type: "textarea", placeholder: "Who is this Onion campaign for? Be specific about demographics, interests, and pain points..." },
    ],
  },
  {
    title: "Campaign Timeline",
    subtitle: "Plan your Onion campaign schedule",
    icon: Calendar,
    fields: [
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
      { name: "duration", label: "Expected Duration", type: "select", options: [
          "1-2 weeks", "3-4 weeks", "1-2 months", "3-6 months"
        ]},
    ],
  },
  {
    title: "Campaign Message",
    subtitle: "Craft your Onion campaign story",
    icon: MessageSquare,
    fields: [
      { name: "message", label: "Your Message", type: "textarea", placeholder: "What's the core message of your Onion campaign? Share your vision and goals..." },
    ],
  },
]

export function EngagingSubmitForm({ onClose }: { onClose: () => void }) {
  const { setModalOpen } = useModal()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const progress = ((currentStep + 1) / formSteps.length) * 100

  useEffect(() => {
    setModalOpen(true)
    return () => setModalOpen(false)
  }, [setModalOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsSubmitting(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubmitting(false)
      triggerConfetti()
      toast.success('Onion campaign created successfully!', {
        icon: <Sparkles className="w-4 h-4" />,
      })
      onClose()
    }
  }

  const IconComponent = formSteps[currentStep].icon

  return (
      <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-xl border-none">
          <CardContent className="p-6 relative">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mb-8">
              <div className="flex items-center gap-6 mb-2">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center transform transition-transform hover:scale-110">
                  <IconComponent className="w-8 h-8 text-[#E86C3A]" />
                </div>
                <div>
                  <h3 className="text-3xl font-normal bg-gradient-to-r from-[#E86C3A] to-[#D55C2A] text-transparent bg-clip-text">
                    {formSteps[currentStep].title}
                  </h3>
                  <p className="text-gray-600 text-lg">{formSteps[currentStep].subtitle}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                  {formSteps[currentStep].fields.map((field) => (
                      <motion.div
                          key={field.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3"
                      >
                        <Label
                            htmlFor={field.name}
                            className="text-base font-medium mb-3 block"
                        >
                      <span className="bg-gradient-to-r from-[#E86C3A] to-[#D55C2A] text-transparent bg-clip-text font-seminormal">
                        {field.label}
                      </span>
                          {field.type === "textarea" && (
                              <span className="block text-sm text-gray-500 mt-1 font-normal">
                          Share your thoughts in detail to help us understand better
                        </span>
                          )}
                        </Label>
                        {field.type === "radio" ? (
                            <RadioGroup
                                value={formData[field.name] || ""}
                                onValueChange={(value) => {
                                  handleRadioChange(value, field.name)
                                  const selectedOption = field.options?.find(opt =>
                                      (typeof opt === 'string' ? opt : opt.value) === value
                                  )
                                  toast.success(`Selected: ${typeof selectedOption === 'string' ? selectedOption : selectedOption?.label}`, {
                                    duration: 1500,
                                    style: {
                                      backgroundColor: '#E86C3A',
                                      color: 'white',
                                    },
                                  })
                                }}
                                className="grid grid-cols-2 gap-4"
                            >
                              {(field.options ?? []).map((option) => (
                                  <div key={typeof option === 'string' ? option : option.value} className="relative">
                                    <RadioGroupItem
                                        value={typeof option === 'string' ? option : option.value}
                                        id={`${field.name}-${typeof option === 'string' ? option : option.value}`}
                                        className="peer sr-only"
                                    />
                                    <Label
                                        htmlFor={`${field.name}-${typeof option === 'string' ? option : option.value}`}
                                        className="flex flex-col h-full p-4 rounded-lg border-2 cursor-pointer transition-all
                                peer-hover:border-[#E86C3A] peer-hover:bg-orange-50
                                peer-checked:border-[#E86C3A] peer-checked:bg-orange-50
                                peer-checked:shadow-md peer-checked:scale-[1.02]
                                peer-checked:[&>span:first-child]:text-[#E86C3A]
                                hover:scale-[1.01]"
                                    >
                                      {typeof option === 'string' ? (
                                          <span className="font-medium mb-1 transition-colors">{option}</span>
                                      ) : (
                                          <>
                                            <span className="font-medium mb-1 transition-colors">{option.label}</span>
                                            <span className="text-sm text-gray-600">{option.description}</span>
                                          </>
                                      )}
                                      <motion.div
                                          className="absolute top-2 right-2 text-[#E86C3A] opacity-0 peer-checked:opacity-100"
                                          initial={false}
                                          animate={{ scale: [0.8, 1.2, 1] }}
                                      >
                                        <CheckCircle2 className="h-5 w-5" />
                                      </motion.div>
                                    </Label>
                                  </div>
                              ))}
                            </RadioGroup>
                        ) : field.type === "textarea" ? (
                            <textarea
                                id={field.name}
                                name={field.name}
                                placeholder={`✨ ${field.placeholder}`}
                                className="w-full p-4 rounded-xl border-2 bg-white/50 backdrop-blur-sm
                          min-h-[120px] resize-y
                          focus:ring-2 focus:ring-[#E86C3A] focus:border-[#E86C3A]
                          hover:border-[#E86C3A]/50 transition-all duration-300
                          placeholder:text-gray-400 placeholder:italic
                          text-gray-700 font-medium"
                                onChange={handleInputChange}
                                value={formData[field.name] || ""}
                            />
                        ) : field.type === "select" ? (
                            <select
                                id={field.name}
                                name={field.name}
                                className="w-full p-4 rounded-xl border-2 bg-white/50 backdrop-blur-sm
                          focus:ring-2 focus:ring-[#E86C3A] focus:border-[#E86C3A]
                          hover:border-[#E86C3A]/50 transition-all duration-300
                          appearance-none cursor-pointer
                          text-gray-700 font-medium"
                                onChange={handleInputChange}
                                value={formData[field.name] || ""}
                            >
                              <option value="" className="text-gray-400 italic">✨ Select campaign duration...</option>
                              {(field.options ?? []).map((option) => (
                                  <option
                                      key={typeof option === 'string' ? option : option.value}
                                      value={typeof option === 'string' ? option : option.value}
                                      className="text-gray-700"
                                  >
                                    {typeof option === 'string' ? option : option.value}
                                  </option>
                              ))}
                            </select>
                        ) : (
                            <Input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                placeholder={`✨ ${field.placeholder}`}
                                className="w-full p-4 rounded-xl border-2 bg-white/50 backdrop-blur-sm
                          focus:ring-2 focus:ring-[#E86C3A] focus:border-[#E86C3A]
                          hover:border-[#E86C3A]/50 transition-all duration-300
                          placeholder:text-gray-400 placeholder:italic
                          text-gray-700 font-medium"
                                onChange={handleInputChange}
                                value={formData[field.name] || ""}
                                required
                            />
                        )}
                      </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <motion.div
                  className="flex justify-between items-center pt-4 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
              >
                {currentStep > 0 && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="border-2 border-gray-200 hover:border-[#E86C3A] hover:bg-orange-50 text-gray-700"
                    >
                      Back
                    </Button>
                )}
                <Button
                    type="submit"
                    className={`${currentStep === 0 ? 'w-full' : 'flex-1'} 
                  bg-[#E86C3A] hover:bg-[#D55C2A] text-white
                  ${isSubmitting ? 'opacity-80' : ''}`}
                    disabled={isSubmitting}
                >
                  {isSubmitting ? (
                      <motion.div
                          className="flex items-center justify-center w-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                      >
                        <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2" />
                        Submitting...
                      </motion.div>
                  ) : currentStep === formSteps.length - 1 ? (
                      <motion.div
                          className="flex items-center justify-center w-full"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                      >
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Launch Campaign
                      </motion.div>
                  ) : (
                      <span className="flex items-center justify-center w-full">
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
  )
}

