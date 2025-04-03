"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { X, Sparkles, ArrowRight, Check } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MultiSelect } from "@/components/ui/multi-select"
import { Textarea } from "@/components/ui/textarea"
import type { CoachData } from "@/types/coach"

// Add coach schema
const coachSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  linkedinUrl: z.string()
    .url({ message: "Please enter a valid LinkedIn URL" })
    .startsWith("https://", { message: "URL must start with https://" })
    .includes("linkedin.com", { message: "Must be a LinkedIn URL" })
    .optional()
    .or(z.literal("")),
  website: z.string()
    .url({ message: "Please enter a valid website URL" })
    .startsWith("https://", { message: "URL must start with https://" })
    .optional()
    .or(z.literal("")),
  expertise: z.array(z.string())
    .min(1, "Select at least one area of expertise")
    .max(5, "Maximum 5 areas of expertise"),
  experience: z.string().min(1, "Please specify your years of experience"),
  languages: z.array(z.string())
    .min(1, "Select at least one language")
    .max(3, "Maximum 3 languages"),
  timezone: z.string().min(1, "Please select your timezone"),
  availability: z.string().min(1, "Please specify your availability"),
  preferredRate: z.string().min(1, "Please specify your preferred rate"),
  certifications: z.array(z.string()).optional(),
  bio: z.string()
    .min(100, "Bio should be at least 100 characters")
    .max(1000, "Bio should not exceed 1000 characters")
})

const EXPERTISE_OPTIONS = [
  "Career Development",
  "Leadership",
  "Executive Coaching",
  "Life Coaching",
  "Business Strategy",
  "Performance",
  "Communication",
  "Team Building"
]

const LANGUAGE_OPTIONS = [
  "English",
  "Mandarin",
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Korean"
]

const TIMEZONE_OPTIONS = [
  "UTC-8 (PST)",
  "UTC-5 (EST)",
  "UTC+0 (GMT)",
  "UTC+1 (CET)",
  "UTC+8 (SGT/CST)",
  "UTC+9 (JST)"
]

const EXPERIENCE_OPTIONS = [
  "1-2 years",
  "3-5 years",
  "5-10 years",
  "10+ years"
]

const AVAILABILITY_OPTIONS = [
  "Full-time",
  "Part-time",
  "Weekends only",
  "Flexible hours",
  "By appointment"
]

const RATE_OPTIONS = [
  "Under $100/hour",
  "$100-200/hour",
  "$200-500/hour",
  "$500+/hour",
  "Custom package"
]

const CERTIFICATION_OPTIONS = [
  "ICF ACC",
  "ICF PCC",
  "ICF MCC",
  "EMCC",
  "CTI",
  "NLP Practitioner",
  "Other"
]

const formSteps = [
  {
    title: "Basic Information",
    description: "Let's start with your professional identity. This information helps us understand who you are and how clients can connect with you.",
    fields: ["fullName", "email", "linkedinUrl", "website"] as const
  },
  {
    title: "Professional Details",
    description: "Share your expertise and experience. This helps us match you with clients who can benefit most from your specific skills.",
    fields: ["expertise", "experience", "languages", "timezone"] as const
  },
  {
    title: "Availability & Rates",
    description: "Tell us about your coaching schedule and preferred compensation. This helps set clear expectations with potential clients.",
    fields: ["availability", "preferredRate", "certifications"] as const
  },
  {
    title: "Bio & Summary",
    description: "Write a compelling bio that showcases your coaching philosophy and approach. This is your chance to stand out and connect with potential clients.",
    fields: ["bio"] as const
  }
] as const

function SuccessState({ onClose }: { onClose: () => void }) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onClose()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="text-center p-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center"
      >
        <Check className="w-8 h-8 text-green-500" />
      </motion.div>
      
      <h2 className="text-2xl font-normal mb-4">
        Application Submitted Successfully!
      </h2>
      
      <p className="text-gray-600 mb-6">
        Thank you for your interest in joining Onion Coach. Our team will review your application and get back to you shortly.
      </p>
      
      <div className="space-y-4">
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="font-medium text-[#E86C3A] mb-2">Next Steps</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#E86C3A]" />
              Application review (2-3 business days)
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#E86C3A]" />
              Initial interview scheduling
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#E86C3A]" />
              Platform onboarding
            </li>
          </ul>
        </div>
        
        <Button
          onClick={onClose}
          className="w-full bg-[#E86C3A] hover:bg-[#D55C2A] text-white"
        >
          Close ({countdown}s)
        </Button>
      </div>
    </motion.div>
  )
}

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
}

const fieldVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.01 }
}

export function CoachForm({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CoachData>({
    resolver: zodResolver(coachSchema),
    defaultValues: {
      expertise: [],
      languages: [],
      certifications: []
    }
  })

  const { register, handleSubmit, formState: { errors }, trigger, watch, setValue } = form

  const handleNextClick = async () => {
    const fields = [...formSteps[currentStep - 1].fields] as Array<keyof CoachData>
    const isValid = await trigger(fields)
    
    if (isValid) {
      setCurrentStep(prev => prev + 1)
      toast.success(`Step ${currentStep} completed!`)
    } else {
      const fieldErrors = fields
        .map(field => errors[field]?.message)
        .filter(Boolean)
        .join(', ')
      toast.error(fieldErrors || "Please fill all required fields correctly")
    }
  }

  const onSubmit = async (data: CoachData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setShowSuccess(true)
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit application')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderFormField = (fieldName: keyof CoachData) => {
    switch (fieldName) {
      case 'expertise':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Areas of Expertise</label>
            <MultiSelect
              options={EXPERTISE_OPTIONS}
              value={watch('expertise')}
              onChange={(value) => setValue('expertise', value)}
              label="Select expertise"
              error={errors.expertise?.message}
            />
          </div>
        )
      case 'languages':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Languages</label>
            <MultiSelect
              options={LANGUAGE_OPTIONS}
              value={watch('languages')}
              onChange={(value) => setValue('languages', value)}
              label="Select languages"
              error={errors.languages?.message}
            />
          </div>
        )
      case 'bio':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Professional Bio</label>
            <Textarea
              {...register('bio')}
              className="min-h-[150px]"
              placeholder="Tell us about your coaching experience and philosophy..."
            />
            {errors.bio?.message && (
              <p className="text-red-500 text-sm">{errors.bio.message}</p>
            )}
          </div>
        )
      case 'linkedinUrl':
      case 'website':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">
              {fieldName === 'linkedinUrl' ? 'LinkedIn Profile' : 'Website'}
            </label>
            <Input
              {...register(fieldName)}
              type="url"
              placeholder={fieldName === 'linkedinUrl' 
                ? "https://linkedin.com/in/your-profile"
                : "https://your-website.com"}
            />
            {errors[fieldName]?.message && (
              <p className="text-red-500 text-sm">{errors[fieldName]?.message}</p>
            )}
            <p className="text-xs text-gray-500">
              {fieldName === 'linkedinUrl' 
                ? "Your LinkedIn profile URL (optional)"
                : "Your professional website URL (optional)"}
            </p>
          </div>
        )
      case 'experience':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Years of Experience</label>
            <select
              {...register('experience')}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
            >
              <option value="">Select experience</option>
              {EXPERIENCE_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.experience?.message && (
              <p className="text-red-500 text-sm">{errors.experience.message}</p>
            )}
          </div>
        )
      case 'availability':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Availability</label>
            <select
              {...register('availability')}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
            >
              <option value="">Select availability</option>
              {AVAILABILITY_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.availability?.message && (
              <p className="text-red-500 text-sm">{errors.availability.message}</p>
            )}
          </div>
        )
      case 'preferredRate':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Preferred Rate</label>
            <select
              {...register('preferredRate')}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
            >
              <option value="">Select rate range</option>
              {RATE_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.preferredRate?.message && (
              <p className="text-red-500 text-sm">{errors.preferredRate.message}</p>
            )}
          </div>
        )
      case 'certifications':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Certifications</label>
            <MultiSelect
              options={CERTIFICATION_OPTIONS}
              value={watch('certifications') || []}
              onChange={(value) => setValue('certifications', value)}
              label="Select certifications"
              error={errors.certifications?.message}
            />
            <p className="text-xs text-gray-500">Select all relevant certifications (optional)</p>
          </div>
        )
      case 'timezone':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Timezone</label>
            <select
              {...register('timezone')}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
            >
              <option value="">Select timezone</option>
              {TIMEZONE_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.timezone?.message && (
              <p className="text-red-500 text-sm">{errors.timezone.message}</p>
            )}
          </div>
        )
      // Add more cases for other fields...
      default:
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <Input
              {...register(fieldName)}
              type={fieldName === 'email' ? 'email' : 'text'}
            />
            {errors[fieldName]?.message && (
              <p className="text-red-500 text-sm">{errors[fieldName]?.message}</p>
            )}
          </div>
        )
    }
  }

  return (
    <motion.div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg relative overflow-hidden bg-white">
        {showSuccess ? (
          <SuccessState onClose={onClose} />
        ) : (
          <>
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 45, 0],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
              animate={{ 
                scale: [1.2, 1, 1.2],
                rotate: [0, -45, 0],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            <CardContent className="p-6 space-y-6 relative max-h-[80vh] overflow-y-auto custom-scrollbar">
              <div className="absolute top-4 right-4 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </Button>
              </div>

              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#E86C3A]"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: `${(currentStep / formSteps.length) * 100}%`,
                    transition: { type: "spring", stiffness: 50 }
                  }}
                />
              </div>

              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="inline-block bg-orange-100 p-3 rounded-full mb-4"
                >
                  <Sparkles className="w-6 h-6 text-[#E86C3A]" />
                </motion.div>
                <h2 className="text-2xl font-normal mb-2">{formSteps[currentStep - 1].title}</h2>
                <p className="text-gray-600">{formSteps[currentStep - 1].description}</p>
                <div className="flex justify-center gap-2 mt-4">
                  {formSteps.map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i + 1 <= currentStep ? 'bg-[#E86C3A]' : 'bg-gray-200'
                      }`}
                      animate={{ scale: i + 1 === currentStep ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.5, repeat: i + 1 === currentStep ? Infinity : 0 }}
                    />
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {formSteps[currentStep - 1].fields.map((fieldName, index) => (
                      <motion.div
                        key={fieldName}
                        variants={fieldVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        transition={{ delay: index * 0.1 }}
                        className="transform-gpu"
                      >
                        {renderFormField(fieldName)}
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="w-28 border-[#E86C3A] text-[#E86C3A] hover:bg-[#E86C3A]/10"
                    >
                      Back
                    </Button>
                  )}
                  <Button 
                    type="button"
                    className={`w-28 bg-[#E86C3A] hover:bg-[#D55C2A] text-white ${currentStep === 1 && 'ml-auto'}`}
                    onClick={async () => {
                      if (currentStep < formSteps.length) {
                        await handleNextClick();
                      } else {
                        await handleSubmit(onSubmit)();
                      }
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <span className="animate-spin mr-2">⏳</span>
                        Submitting...
                      </div>
                    ) : (
                      <span className="flex items-center justify-center">
                        {currentStep === formSteps.length ? 'Submit' : 'Next'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </motion.div>
  )
}

