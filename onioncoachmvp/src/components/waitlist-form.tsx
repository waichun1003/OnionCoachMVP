"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { X, Sparkles, ArrowRight, Check, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod" // For validation
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Analytics } from '@vercel/analytics/react'
import { MultiSelect } from "@/components/ui/multi-select"
import { AssessmentResults } from "@/types/assessment"

// Form validation schema
const formSchema = z.object({
  fullName: z.string()
    .min(2, "Please enter your full name")
    .regex(/^[a-zA-Z\s]*$/, "Name should only contain letters and spaces"),
  email: z.string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  phone: z.string()
    .min(10, "Phone number is too short")
    .max(15, "Phone number is too long")
    .optional(),
  company: z.string().optional(),
  role: z.string()
    .min(2, "Please specify your current role")
    .max(100, "Role name is too long"),
  industry: z.string().min(1, "Please select your industry"),
  companySize: z.string().min(1, "Please select your company size"),
  experienceLevel: z.string().min(1, "Please select your experience level"),
  coachingGoals: z.array(z.string()).min(1, "Please select at least one goal"),
  preferredLanguage: z.string().default("English"),
  location: z.string().min(1, "Please enter your location"),
  heardFrom: z.string().min(1, "Please tell us how you heard about us"),
  budgetRange: z.string().min(1, "Please select your budget range"),
  startTimeline: z.string().min(1, "Please select your preferred start timeline"),
  interests: z.array(z.string()),
  pricingTier: z.enum(
    ["Professional Growth", "Entrepreneur Elite", "Enterprise Solutions"],
    {
      errorMap: () => ({ message: "Please select a pricing tier" })
    }
  ),
  assessmentResults: z.object({
    personalityType: z.string().optional(),
    strengths: z.array(z.string()).optional(),
    challenges: z.array(z.string()).optional(),
    recommendedPath: z.string().optional(),
    scores: z.record(z.number()).optional(),
    completedAt: z.string().optional()
  }).optional(),
  areasOfExpertise: z.array(z.string()).min(1, "Please select at least one area of expertise"),
  yearsOfExperience: z.array(z.string()).min(1, "Please select your years of experience"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
})

type FormData = z.infer<typeof formSchema>

// Constants for form options
const COACHING_GOALS = [
  { label: "Career Advancement", value: "Career Advancement" },
  { label: "Leadership Development", value: "Leadership Development" },
  { label: "Work-Life Balance", value: "Work-Life Balance" },
  { label: "Communication Skills", value: "Communication Skills" },
  { label: "Team Management", value: "Team Management" },
  { label: "Personal Growth", value: "Personal Growth" },
  { label: "Business Strategy", value: "Business Strategy" },
  { label: "Productivity", value: "Productivity" }
]

const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Consulting",
  "Other"
]

const COMPANY_SIZES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "500+ employees"
]

const EXPERIENCE_LEVELS = [
  "Entry Level (0-2 years)",
  "Mid Level (3-5 years)",
  "Senior Level (6-10 years)",
  "Executive (10+ years)"
]

const BUDGET_OPTIONS = [
  { value: "0-5k", label: "USD $0 - $5,000 (Basic)" },
  { value: "5k-10k", label: "USD $5,000 - $10,000 (Standard)" },
  { value: "10k-50k", label: "USD $10,000 - $50,000 (Professional)" },
  { value: "50k+", label: "USD $50,000+ (Enterprise)" }
]

const TIMELINE_OPTIONS = [
  { value: "1-3 months", label: "1-3 months (Short term campaign)" },
  { value: "3-6 months", label: "3-6 months (Medium term campaign)" },
  { value: "6-12 months", label: "6-12 months (Long term campaign)" },
  { value: "12+ months", label: "12+ months (Ongoing campaign)" }
]

const DURATION_OPTIONS = [
  "1 week",
  "2 weeks",
  "4 weeks",
  "6 weeks",
  "8 weeks",
  "12 weeks",
  "Custom"
]

// Add these constants at the top with other constants
const AREAS_OF_EXPERTISE = [
  { label: "Life Coaching", value: "Life Coaching" },
  { label: "Career Development", value: "Career Development" },
  { label: "Leadership", value: "Leadership" },
  { label: "Business Strategy", value: "Business Strategy" },
  { label: "Personal Growth", value: "Personal Growth" },
  { label: "Executive Coaching", value: "Executive Coaching" },
  { label: "Team Management", value: "Team Management" },
  { label: "Work-Life Balance", value: "Work-Life Balance" }
];

const YEARS_OF_EXPERIENCE = [
  { label: "1-2 years", value: "1-2 years" },
  { label: "3-5 years", value: "3-5 years" },
  { label: "5-10 years", value: "5-10 years" },
  { label: "10+ years", value: "10+ years" }
];

const LANGUAGES = [
  { label: "English", value: "English" },
  { label: "Spanish", value: "Spanish" },
  { label: "Mandarin", value: "Mandarin" },
  { label: "Cantonese", value: "Cantonese" },
  { label: "French", value: "French" },
  { label: "German", value: "German" },
  { label: "Japanese", value: "Japanese" }
];

// Success state component
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
        Successfully Joined Waitlist!
      </h2>
      
      <p className="text-gray-600 mb-6">
        Thank you for your interest. Our team will review your application and get back to you shortly.
      </p>
      
      <div className="space-y-4">
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="font-medium text-[#E86C3A] mb-2">Next Steps</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#E86C3A]" />
              Check your email for confirmation
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#E86C3A]" />
              Complete initial assessment
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#E86C3A]" />
              Schedule your consultation
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

interface WaitlistFormProps {
  onClose: () => void;
  selectedTier: string;
  assessmentResults?: AssessmentResults;
}

// Add these animation variants
const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
}

const fieldVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
}

export function WaitlistForm({ onClose, selectedTier, assessmentResults }: WaitlistFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formContainerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange"
  })

  // First, add more form steps
  const formSteps = [
    {
      title: "Basic Information",
      description: "Let's start with your details",
      fields: ["fullName", "email", "phone"]
    },
    {
      title: "Professional Details",
      description: "Tell us about your work",
      fields: ["company", "role", "industry", "companySize", "experienceLevel"]
    },
    {
      title: "Coaching Preferences",
      description: "Help us understand your goals",
      fields: ["coachingGoals", "interests", "preferredLanguage", "location"]
    },
    {
      title: "Getting Started",
      description: "Final details to get you set up",
      fields: ["budgetRange", "startTimeline", "heardFrom"]
    }
  ] satisfies Array<{
    title: string;
    description: string;
    fields: Array<keyof FormData>;
  }>;

  const renderFormField = (fieldName: keyof FormData) => {
    switch (fieldName) {
      case 'fullName':
      case 'email':
      case 'phone':
      case 'location':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <Input
              {...register(fieldName)}
              type={fieldName === 'email' ? 'email' : 'text'}
              placeholder={getFieldPlaceholder(fieldName)}
              className="w-full"
            />
            {errors[fieldName] && (
              <p className="text-red-500 text-sm mt-1">
                {(errors[fieldName] as { message: string })?.message}
              </p>
            )}
          </div>
        )

      case 'coachingGoals':
      case 'interests':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {fieldName === 'coachingGoals' ? 'Coaching Goals' : 'Areas of Interest'}
            </label>
            <MultiSelect
              value={watch(fieldName) || []}
              onChange={(value) => setValue(fieldName, value)}
              options={fieldName === 'coachingGoals' ? COACHING_GOALS : COACHING_GOALS}
              placeholder={getFieldPlaceholder(fieldName)}
            />
            {errors[fieldName] && (
              <p className="text-red-500 text-sm mt-1">
                {(errors[fieldName] as { message: string })?.message}
              </p>
            )}
          </div>
        )

      case 'company':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <p className="text-sm text-gray-500 mb-2">Where do you currently work?</p>
            <Input
              {...register('company')}
              placeholder="Company name"
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.company as { message: string })?.message}
              </p>
            )}
          </div>
        )

      case 'role':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <p className="text-sm text-gray-500 mb-2">Your current position or title</p>
            <Input
              {...register('role')}
              placeholder="Senior Manager"
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.role as { message: string })?.message}
              </p>
            )}
          </div>
        )

      case 'industry':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Industry</label>
            <p className="text-sm text-gray-500 mb-2">Which industry do you work in?</p>
            <select
              {...register('industry')}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
            >
              <option value="">Select industry</option>
              {INDUSTRIES.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.industry && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.industry as { message: string })?.message}
              </p>
            )}
          </div>
        )

      case 'companySize':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Company Size</label>
            <p className="text-sm text-gray-500 mb-2">How large is your organization?</p>
            <select
              {...register('companySize')}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
            >
              <option value="">Select company size</option>
              {COMPANY_SIZES.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.companySize && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.companySize as { message: string })?.message}
              </p>
            )}
          </div>
        )

      case 'experienceLevel':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Experience Level</label>
            <p className="text-sm text-gray-500 mb-2">Your professional experience level</p>
            <select
              {...register('experienceLevel')}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
            >
              <option value="">Select experience level</option>
              {EXPERIENCE_LEVELS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.experienceLevel && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.experienceLevel as { message: string })?.message}
              </p>
            )}
          </div>
        )

      case 'preferredLanguage':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Language</label>
            <p className="text-sm text-gray-500 mb-2">What language do you prefer for coaching?</p>
            <select
              {...register('preferredLanguage')}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
            >
              <option value="">Select language</option>
              {["English", "Spanish", "French", "German", "Chinese", "Japanese"].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.preferredLanguage && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.preferredLanguage as { message: string })?.message}
              </p>
            )}
          </div>
        )

      case 'budgetRange':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Budget Range</label>
            <p className="text-sm text-gray-500 mb-2">Your expected investment range</p>
            <select
              {...register('budgetRange')}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
            >
              <option value="">Select budget range</option>
              {BUDGET_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.budgetRange && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.budgetRange as { message: string })?.message}
              </p>
            )}
          </div>
        )

      case 'startTimeline':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Start Timeline</label>
            <p className="text-sm text-gray-500 mb-2">When would you like to begin?</p>
            <select
              {...register('startTimeline')}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
            >
              <option value="">Select start timeline</option>
              {TIMELINE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.startTimeline && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.startTimeline as { message: string })?.message}
              </p>
            )}
          </div>
        )

      case 'heardFrom':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Heard From</label>
            <p className="text-sm text-gray-500 mb-2">How did you discover us?</p>
            <select
              {...register('heardFrom')}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
            >
              <option value="">Select how you heard about us</option>
              {["Google Search", "Social Media", "Referral", "Other"].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.heardFrom && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.heardFrom as { message: string })?.message}
              </p>
            )}
          </div>
        )

      case 'coachingGoals':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Coaching Goals</label>
            <p className="text-sm text-gray-500 mb-2">What do you want to achieve through coaching?</p>
            <MultiSelect
            value={watch('coachingGoals') || []}
            onChange={(value) => setValue('coachingGoals', value)}
            options={COACHING_GOALS}
            placeholder="Select goals..."
          />
          {errors.coachingGoals && (
            <p className="text-red-500 text-sm mt-1">
              {(errors.coachingGoals as { message: string })?.message}
            </p>
          )}
        </div>
      )

      case 'interests':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Areas of Interest</label>
            <p className="text-sm text-gray-500 mb-2">Areas you're interested in developing</p>
            <MultiSelect
              value={watch('interests') || []}
              onChange={(value) => setValue('interests', value)}
              options={COACHING_GOALS}
              placeholder="Select areas of interest..."
            />
            {errors.interests && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.interests as { message: string })?.message}
              </p>
            )}
          </div>
        )

      case 'pricingTier':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Pricing Tier</label>
            <p className="text-sm text-gray-500 mb-2">Selected pricing package</p>
            <select
              {...register('pricingTier')}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
            >
              <option value="">Select pricing tier</option>
              {["Professional Growth", "Entrepreneur Elite", "Enterprise Solutions"].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.pricingTier && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.pricingTier as { message: string })?.message}
              </p>
            )}
          </div>
        )

      case 'areasOfExpertise':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Areas of Expertise</label>
            <p className="text-sm text-gray-500 mb-2">Select your coaching specialties</p>
            <MultiSelect
              value={watch('areasOfExpertise') || []}
              onChange={(value) => setValue('areasOfExpertise', value)}
              options={AREAS_OF_EXPERTISE}
              placeholder="Select areas of expertise..."
            />
            {errors.areasOfExpertise && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.areasOfExpertise as { message: string })?.message}
              </p>
            )}
          </div>
        );

      case 'yearsOfExperience':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Years of Experience</label>
            <p className="text-sm text-gray-500 mb-2">Select your experience level</p>
            <MultiSelect
              value={watch('yearsOfExperience') || []}
              onChange={(value) => setValue('yearsOfExperience', value)}
              options={YEARS_OF_EXPERIENCE}
              placeholder="Select years of experience..."
            />
            {errors.yearsOfExperience && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.yearsOfExperience as { message: string })?.message}
              </p>
            )}
          </div>
        );

      case 'languages':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Languages</label>
            <p className="text-sm text-gray-500 mb-2">Select languages you can coach in</p>
            <MultiSelect
              value={watch('languages') || []}
              onChange={(value) => setValue('languages', value)}
              options={LANGUAGES}
              placeholder="Select languages..."
            />
            {errors.languages && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.languages as { message: string })?.message}
              </p>
            )}
          </div>
        );

      // Default case for other fields
      default:
        return (
          <div>
            <label className="block text-sm font-medium mb-1">
              {(fieldName as string).charAt(0).toUpperCase() + 
               (fieldName as string).slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <p className="text-sm text-gray-500 mb-2">
              {getFieldDescription(fieldName)}
            </p>
            <Input
              {...register(fieldName)}
              className="transition-all duration-200 hover:border-[#E86C3A]/50 focus:border-[#E86C3A] focus:ring-2 focus:ring-[#E86C3A]/20"
              placeholder={getFieldPlaceholder(fieldName)}
            />
            {errors[fieldName] && (
              <p className="text-red-500 text-sm mt-1">
                {(errors[fieldName] as { message: string })?.message}
              </p>
            )}
          </div>
        )
    }
  }

  // Add these helper functions
  const getFieldDescription = (fieldName: keyof FormData): string => {
    const descriptions: Record<keyof FormData, string> = {
      fullName: "Your full name as you'd like to be addressed",
      email: "We'll use this to send you important updates",
      phone: "Optional - for quick communication if needed",
      company: "Where do you currently work?",
      role: "Your current position or title",
      industry: "Which industry do you work in?",
      companySize: "How large is your organization?",
      experienceLevel: "Your professional experience level",
      coachingGoals: "What do you want to achieve through coaching?",
      preferredLanguage: "What language do you prefer for coaching?",
      location: "Where are you based?",
      heardFrom: "How did you discover us?",
      budgetRange: "Your expected investment range",
      startTimeline: "When would you like to begin?",
      interests: "Areas you're interested in developing",
      pricingTier: "Selected pricing package",
      assessmentResults: "Your assessment results and recommendations",
      areasOfExpertise: "Select your coaching specialties",
      yearsOfExperience: "Select your experience level",
      languages: "Select languages you can coach in",
    }
    return descriptions[fieldName] || ""
  }

  const getFieldPlaceholder = (fieldName: keyof FormData): string => {
    const placeholders: Record<keyof FormData, string> = {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 000-0000",
      company: "Company name",
      role: "Senior Manager",
      industry: "Select your industry",
      companySize: "Select company size",
      experienceLevel: "Select experience level",
      coachingGoals: "Select your goals",
      preferredLanguage: "Select language",
      location: "City, Country",
      heardFrom: "How did you hear about us?",
      budgetRange: "Select budget range",
      startTimeline: "Select start date",
      interests: "Select areas of interest",
      pricingTier: "Select pricing tier",
      assessmentResults: "Assessment data",
      areasOfExpertise: "Select areas of expertise",
      yearsOfExperience: "Select years of experience",
      languages: "Select languages",
    }
    return placeholders[fieldName] || ""
  }

  const calculateMinDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  const handleNextClick = async () => {
    const fields = formSteps[currentStep - 1].fields as Array<keyof FormData>
    const isValid = await trigger(fields)

    if (isValid) {
      if (currentStep === formSteps.length) {
        await handleSubmit(onSubmit)()
      } else {
        setCurrentStep(prev => prev + 1)
        toast.success(`Step ${currentStep} completed!`)
      }
    } else {
      toast.error("Please fill in all required fields")
    }
  }

  // Add this form submission handler
  const onSubmit = async (data: FormData) => {
    console.log('Form data before submission:', data);
    
    // Format data for waitlist submission
    const formattedData = {
      // Basic Information
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || undefined,
      
      // Professional Details
      company: data.company || undefined,
      industry: data.industry,
      companySize: data.companySize,
      experienceLevel: data.experienceLevel,
      
      // Coaching Preferences
      coachingGoals: data.coachingGoals || [],
      interests: data.interests || [],
      preferredLanguage: data.preferredLanguage || 'English',
      location: data.location,
      
      // Getting Started
      budgetRange: data.budgetRange,
      startTimeline: data.startTimeline,
      heardFrom: data.heardFrom,
      
      // Required fields with defaults
      pricingTier: selectedTier || 'free_assessment',
      role: 'prospect',
      status: 'pending',
      
      // Additional Metadata
      submittedAt: new Date().toISOString(),
      source: 'waitlist-form',
      
      // Assessment Results
      assessmentResults: assessmentResults ? {
        ...assessmentResults,
        completedAt: assessmentResults.completedAt || new Date().toISOString()
      } : null,
    };

    console.log('Formatted data:', formattedData);

    setIsSubmitting(true)
    try {
      // First save to waitlist
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      })

      if (!response.ok) throw new Error('Failed to submit waitlist form')

      // Get the waitlist entry response which includes the assessment results
      const waitlistEntry = await response.json();
      console.log('Waitlist entry received:', waitlistEntry); // Debug log

      // Format data specifically for email
      const emailData = {
        to: data.email,
        name: data.fullName,
        template: 'waitlist-welcome',
        assessmentResults: {
          scores: waitlistEntry.assessmentResults.scores,
          personalityType: waitlistEntry.assessmentResults.personalityType,
          recommendedPath: waitlistEntry.assessmentResults.recommendedPath,
          strengths: waitlistEntry.assessmentResults.strengths || [],
          challenges: waitlistEntry.assessmentResults.challenges || []
        },
        data: {
          name: data.fullName,
          nextSteps: [
            "We'll review your application",
            'Schedule an initial consultation',
            'Match you with the perfect coach'
          ]
        }
      };

      console.log('Email data before sending:', JSON.stringify(emailData, null, 2)); // Debug log

      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        console.error('Failed to send welcome email:', errorData);
        throw new Error('Failed to send welcome email');
      }

      // Show success message
      toast.success('Successfully joined the waitlist!', {
        description: 'Check your email for more information.'
      });

      // Reset form and close modal if needed
      reset();
      if (onClose) onClose();

    } catch (error: any) {
      console.error('Error:', error);
      toast.error('Something went wrong', {
        description: 'Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add this helper function at the top with other constants
  const getChannelDescription = (channel: string) => ({
    "One-on-one Sessions": "Personal coaching sessions",
    "Group Workshops": "Interactive group learning",
    "Virtual Meetings": "Online video sessions",
    "In-person Training": "Face-to-face sessions",
    "Online Courses": "Self-paced learning",
    "Hybrid Learning": "Mix of virtual and in-person"
  })[channel];

  useEffect(() => {
    if (formContainerRef.current) {
      formContainerRef.current.scrollTop = 0;
    }
  }, [currentStep]);

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
                scale: [1, 1.1, 1],
                rotate: [0, 45, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
              animate={{ 
                scale: [1.1, 1, 1.1],
                rotate: [0, -45, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <CardContent 
              ref={formContainerRef}
              className="p-6 space-y-6 relative max-h-[80vh] overflow-y-auto custom-scrollbar"
            >
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
                <p className="text-gray-600">Step {currentStep} of {formSteps.length}</p>
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

              <form>
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
                    className={`w-28 bg-[#E86C3A] hover:bg-[#D55C2A] text-white ${!currentStep && 'ml-auto'}`}
                    onClick={async (e) => {
                      e.preventDefault();
                      if (currentStep < formSteps.length) {
                          await handleNextClick();
                        } else {
                        await onSubmit(watch());
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