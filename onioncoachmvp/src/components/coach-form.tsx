"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { X, Sparkles, ArrowRight, Check, Upload, User } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import type { CoachData } from "@/types/coach"
import { useModal } from "@/components/ui/modal-context"

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
  expertise: z.string().min(1, "Please select an area of expertise"),
  experience: z.string().min(1, "Please specify your years of experience"),
  languages: z.string().min(1, "Please select a language"),
  timezone: z.string().min(1, "Please select your timezone"),
  availability: z.string().min(1, "Please specify your availability"),
  preferredRate: z.string().min(1, "Please specify your preferred rate"),
  certifications: z.string().optional(),
  profilePicture: z.string().optional(),
  bio: z.string()
    .min(100, "Bio should be at least 100 characters")
    .max(1000, "Bio should not exceed 1000 characters")
})

const EXPERTISE_OPTIONS = [
  { value: "career-development", label: "Career Development" },
  { value: "leadership", label: "Leadership" },
  { value: "executive-coaching", label: "Executive Coaching" },
  { value: "life-coaching", label: "Life Coaching" },
  { value: "business-strategy", label: "Business Strategy" },
  { value: "performance", label: "Performance" },
  { value: "communication", label: "Communication" },
  { value: "team-building", label: "Team Building" },
  { value: "entrepreneurship", label: "Entrepreneurship" },
  { value: "work-life-balance", label: "Work-Life Balance" },
  { value: "confidence-building", label: "Confidence Building" },
  { value: "stress-management", label: "Stress Management" }
]

const LANGUAGE_OPTIONS = [
  { value: "english", label: "English" },
  { value: "mandarin", label: "Mandarin" },
  { value: "cantonese", label: "Cantonese" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "japanese", label: "Japanese" },
  { value: "korean", label: "Korean" },
  { value: "portuguese", label: "Portuguese" },
  { value: "italian", label: "Italian" },
  { value: "dutch", label: "Dutch" },
  { value: "russian", label: "Russian" }
]

const TIMEZONE_OPTIONS = [
  "UTC-12 (Baker Island)",
  "UTC-11 (American Samoa)",
  "UTC-10 (Hawaii)",
  "UTC-9 (Alaska)",
  "UTC-8 (PST - Los Angeles)",
  "UTC-7 (MST - Denver)",
  "UTC-6 (CST - Chicago)",
  "UTC-5 (EST - New York)",
  "UTC-4 (Atlantic)",
  "UTC-3 (Brazil)",
  "UTC-2 (South Georgia)",
  "UTC-1 (Azores)",
  "UTC+0 (GMT - London)",
  "UTC+1 (CET - Paris)",
  "UTC+2 (EET - Cairo)",
  "UTC+3 (MSK - Moscow)",
  "UTC+4 (GST - Dubai)",
  "UTC+5 (PKT - Karachi)",
  "UTC+5:30 (IST - Mumbai)",
  "UTC+6 (BST - Dhaka)",
  "UTC+7 (ICT - Bangkok)",
  "UTC+8 (SGT/CST - Singapore)",
  "UTC+9 (JST - Tokyo)",
  "UTC+10 (AEST - Sydney)",
  "UTC+11 (NCT - New Caledonia)",
  "UTC+12 (NZST - Auckland)"
]

const EXPERIENCE_OPTIONS = [
  "1-2 years",
  "3-5 years",
  "5-10 years",
  "10-15 years",
  "15+ years"
]

const AVAILABILITY_OPTIONS = [
  "Full-time (40+ hours/week)",
  "Part-time (20-39 hours/week)",
  "Limited (10-19 hours/week)",
  "Weekends only",
  "Evenings only",
  "Flexible hours",
  "By appointment only"
]

const RATE_OPTIONS = [
  "Under $50/hour",
  "$50-100/hour",
  "$100-150/hour",
  "$150-200/hour",
  "$200-300/hour",
  "$300-500/hour",
  "$500+/hour",
  "Package deals only",
  "Custom rates"
]

const CERTIFICATION_OPTIONS = [
  "ICF ACC (Associate Certified Coach)",
  "ICF PCC (Professional Certified Coach)",
  "ICF MCC (Master Certified Coach)",
  "EMCC (European Mentoring & Coaching Council)",
  "CTI (Co-Active Training Institute)",
  "NLP Practitioner",
  "Certified Professional Coach (CPC)",
  "Board Certified Coach (BCC)",
  "Other professional certification"
]

const formSteps = [
  {
    title: "Basic Information",
    description: "Let's start with your professional identity. This information helps us understand who you are and how clients can connect with you.",
    fields: ["profilePicture", "fullName", "email", "linkedinUrl", "website"] as const
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
  const { setModalOpen } = useModal()
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profilePicturePreview, setProfilePicturePreview] = useState<string>('')
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  const form = useForm<CoachData>({
    resolver: zodResolver(coachSchema),
    defaultValues: {
      expertise: "",
      languages: "",
      certifications: "",
      profilePicture: ""
    }
  })

  const { register, handleSubmit, formState: { errors }, trigger, watch, setValue } = form

  useEffect(() => {
    setModalOpen(true)
    return () => setModalOpen(false)
  }, [setModalOpen])

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
        const errorData = await response.json()
        throw new Error(errorData.error || 'Submission failed')
      }

      setShowSuccess(true)
      toast.success('Application submitted successfully!')
    } catch (error: any) {
      console.error('Form submission error:', error)
      toast.error(error.message || 'Failed to submit application')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file')
      return
    }

    setIsUploadingImage(true)
    
    try {
      // Convert file to base64
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      })

      // Call API route to upload to Cloudinary
      const response = await fetch('/api/upload-profile-picture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64 }),
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const { url } = await response.json()
      
      // Set the Cloudinary URL in the form
      setValue('profilePicture', url)
      setProfilePicturePreview(url)
      
      toast.success('Profile picture uploaded successfully!')
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image. Please try again.')
    } finally {
      setIsUploadingImage(false)
    }
  }

  const renderFormField = (fieldName: keyof CoachData) => {
    switch (fieldName) {
      case 'profilePicture':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Profile Picture</label>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 relative">
                {isUploadingImage ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#E86C3A]"></div>
                    <span className="text-xs text-gray-500 mt-1">Uploading...</span>
                  </div>
                ) : profilePicturePreview ? (
                  <img 
                    src={profilePicturePreview} 
                    alt="Profile preview" 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="flex flex-col items-center space-y-2">
                <label className={`cursor-pointer ${isUploadingImage ? 'opacity-50 cursor-not-allowed' : 'bg-[#E86C3A] hover:bg-[#D55C2A]'} text-white px-4 py-2 rounded-md text-sm flex items-center space-x-2 transition-colors`}>
                  <Upload className="w-4 h-4" />
                  <span>{profilePicturePreview ? 'Change Photo' : 'Upload Photo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="hidden"
                    disabled={isUploadingImage}
                  />
                </label>
                {profilePicturePreview && !isUploadingImage && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setProfilePicturePreview('')
                      setValue('profilePicture', '')
                    }}
                    className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Remove Photo
                  </Button>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center">Upload a professional headshot (max 5MB, JPG/PNG)</p>
          </div>
        )
      case 'expertise':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Areas of Expertise</label>
            <select
              {...register('expertise')}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
            >
              <option value="">Select expertise</option>
              {EXPERTISE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.expertise?.message && (
              <p className="text-red-500 text-sm">{errors.expertise.message}</p>
            )}
          </div>
        )
      case 'languages':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Languages</label>
            <select
              {...register('languages')}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
            >
              <option value="">Select language</option>
              {LANGUAGE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.languages?.message && (
              <p className="text-red-500 text-sm">{errors.languages.message}</p>
            )}
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
            <select
              {...register('certifications')}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
            >
              <option value="">Select certifications</option>
              {CERTIFICATION_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.certifications?.message && (
              <p className="text-red-500 text-sm">{errors.certifications.message}</p>
            )}
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
              <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: #f1f1f1;
                  border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: #E86C3A;
                  border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: #D55C2A;
                }
              `}</style>
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

