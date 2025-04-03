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
import { ImageUpload } from "@/components/ui/image-upload"

// Form validation schema
const formSchema = z.object({
  title: z.string().min(2, "Please enter a campaign title"),
  description: z.string()
    .min(50, "Description should be at least 50 characters")
    .max(500, "Description should not exceed 500 characters"),
  coverImage: z.string().optional(),
  coach: z.string().min(2, "Please enter the coach name"),
  startDate: z.string().min(1, "Please select a start date"),
  endDate: z.string().min(1, "Please select an end date"),
  maxParticipants: z.number()
    .min(1, "Minimum 1 participant required")
    .max(200, "Maximum 200 participants allowed"),
  duration: z.string().min(1, "Please specify the campaign duration"),
  sessions: z.number()
    .min(1, "Must have at least 1 session")
    .max(52, "Maximum 52 sessions allowed"),
  campaignGoals: z.array(z.string())
    .min(1, "Please select at least one goal")
    .max(5, "Maximum 5 goals allowed"),
  targetAudience: z.string().min(1, "Please describe your target audience"),
  budget: z.string().min(1, "Please select your budget range"),
  timeline: z.string().min(1, "Please select your timeline"),
  preferredChannels: z.array(z.string())
    .min(1, "Please select at least one channel"),
  messageStyle: z.string().min(1, "Please select your message style"),
  kpis: z.array(z.string())
    .min(1, "Please select at least one KPI"),
  tags: z.array(z.string()).optional()
}).refine((data) => {
  if (!data.startDate || !data.endDate) return false;
  return new Date(data.endDate) > new Date(data.startDate);
}, {
  message: "End date must be after start date",
  path: ["endDate"]
});

type FormData = z.infer<typeof formSchema>

// Constants for form options
const CAMPAIGN_GOALS = [
  "Leadership Development",
  "Skill Enhancement",
  "Team Building",
  "Career Growth",
  "Performance Improvement",
  "Cultural Transformation",
  "Innovation & Creativity",
  "Change Management"
]

const MESSAGE_STYLES = [
  "Professional & Formal",
  "Casual & Engaging",
  "Interactive & Dynamic",
  "Structured & Methodical",
  "Creative & Inspiring"
]

const PREFERRED_CHANNELS = [
  "One-on-one Sessions",
  "Group Workshops",
  "Virtual Meetings",
  "In-person Training",
  "Online Courses",
  "Hybrid Learning"
]

const KPI_OPTIONS = [
  "Participant Satisfaction",
  "Skill Assessment Scores",
  "Behavioral Changes",
  "Performance Metrics",
  "ROI Measurement",
  "Learning Outcomes",
  "Implementation Success"
] as const;

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
        Campaign Request Submitted!
      </h2>
      
      <p className="text-gray-600 mb-6">
        Thank you for your campaign request. Our team will review your requirements and get back to you shortly.
      </p>
      
      <div className="space-y-4">
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="font-medium text-[#E86C3A] mb-2">Next Steps</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#E86C3A]" />
              Review confirmation email
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#E86C3A]" />
              Schedule strategy call
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#E86C3A]" />
              Prepare campaign brief
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

interface CampaignFormProps {
  onClose: () => void;
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

export function CampaignForm({ onClose }: CampaignFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange"
  })

  // First, add more form steps
  const formSteps = [
    {
      title: "Basic Information",
      fields: ["title", "description", "coach", "coverImage"]
    },
    {
      title: "Campaign Details",
      fields: ["startDate", "endDate", "maxParticipants", "duration", "sessions"]
    },
    {
      title: "Campaign Strategy",
      fields: ["campaignGoals", "targetAudience", "messageStyle", "tags"]
    },
    {
      title: "Implementation",
      fields: ["budget", "timeline", "preferredChannels"]
    },
    {
      title: "Success Metrics",
      fields: ["kpis"]
    }
  ] satisfies Array<{
    title: string;
    fields: Array<keyof FormData>;
  }>;

  const renderFormField = (fieldName: keyof FormData) => {
    switch (fieldName) {
      case 'title':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Campaign Title</label>
            <p className="text-sm text-gray-500 mb-2">Give your campaign a clear, memorable name</p>
            <Input
              {...register('title')}
              placeholder="e.g., Summer Leadership Workshop 2024"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
        )

      case 'description':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Campaign Description</label>
            <p className="text-sm text-gray-500 mb-2">Provide a clear description of your campaign</p>
            <Textarea
              {...register('description')}
              placeholder="Describe your campaign's purpose, goals, and what participants can expect..."
              className="min-h-[100px]"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>
        )

      case 'coach':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Lead Coach</label>
            <p className="text-sm text-gray-500 mb-2">Who will be leading this campaign?</p>
            <Input
              {...register('coach')}
              placeholder="e.g., Sarah Chen"
            />
            {errors.coach && (
              <p className="text-red-500 text-sm mt-1">{errors.coach.message}</p>
            )}
          </div>
        )

      case 'duration':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Campaign Duration</label>
            <p className="text-sm text-gray-500 mb-2">How long will the campaign run?</p>
            <select
              {...register('duration')}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
            >
              <option value="">Select duration</option>
              {DURATION_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
            )}
          </div>
        )

      case 'sessions':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Number of Sessions</label>
            <p className="text-sm text-gray-500 mb-2">How many sessions will be included?</p>
            <Input
              type="number"
              {...register('sessions', { valueAsNumber: true })}
              placeholder="e.g., 8"
              min={1}
              max={52}
            />
            {errors.sessions && (
              <p className="text-red-500 text-sm mt-1">{errors.sessions.message}</p>
            )}
          </div>
        )

      case 'campaignGoals':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Campaign Goals</label>
            <p className="text-sm text-gray-500 mb-2">What you want to achieve</p>
            <MultiSelect
              value={watch('campaignGoals') || []}
              onChange={(value) => setValue('campaignGoals', value)}
              options={CAMPAIGN_GOALS.map(goal => ({ label: goal, value: goal }))}
              placeholder="Select goals..."
            />
            {errors.campaignGoals && (
              <p className="text-red-500 text-sm mt-1">{errors.campaignGoals.message}</p>
            )}
          </div>
        )

      case 'targetAudience':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Target Audience</label>
            <p className="text-sm text-gray-500 mb-2">Describe who this campaign is designed to reach</p>
            <Input
              {...register('targetAudience')}
              placeholder="e.g., Mid-level managers in tech industry"
            />
            {errors.targetAudience && (
              <p className="text-red-500 text-sm mt-1">{errors.targetAudience.message}</p>
            )}
          </div>
        )

      case 'messageStyle':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Message Style</label>
            <p className="text-sm text-gray-500 mb-2">Choose the tone that best fits your campaign</p>
            <select
              {...register('messageStyle')}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
            >
              <option value="">Select style</option>
              {MESSAGE_STYLES.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
            {errors.messageStyle && (
              <p className="text-red-500 text-sm mt-1">{errors.messageStyle.message}</p>
            )}
          </div>
        )

      case 'startDate':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <p className="text-sm text-gray-500 mb-2">When will the campaign begin?</p>
            <Input
              type="date"
              {...register('startDate')}
              min={new Date().toISOString().split('T')[0]}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
              onChange={(e) => {
                register('startDate').onChange(e);
                // Reset end date if it's before new start date
                const endDate = watch('endDate');
                if (endDate && new Date(endDate) <= new Date(e.target.value)) {
                  setValue('endDate', '');
                }
              }}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
            )}
          </div>
        )

      case 'endDate':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <p className="text-sm text-gray-500 mb-2">When will the campaign end?</p>
            <Input
              type="date"
              {...register('endDate')}
              min={watch('startDate') || new Date().toISOString().split('T')[0]}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
              disabled={!watch('startDate')}
            />
            {!watch('startDate') && (
              <p className="text-orange-500 text-sm mt-1">Please select a start date first</p>
            )}
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
            )}
          </div>
        )

      case 'maxParticipants':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Maximum Participants</label>
            <Input
              type="number"
              {...register('maxParticipants', { valueAsNumber: true })}
              className="w-full h-12 px-3 border rounded-md focus:ring-2 focus:ring-[#E86C3A]"
              placeholder="e.g., 50"
            />
            {errors.maxParticipants && (
              <p className="text-red-500 text-sm mt-1">{errors.maxParticipants.message}</p>
            )}
          </div>
        )

      case 'coverImage':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Cover Image</label>
            <p className="text-sm text-gray-500 mb-2">Upload a cover image for your campaign</p>
            <ImageUpload
              value={watch('coverImage')}
              onChange={(url) => setValue('coverImage', url)}
              disabled={isSubmitting}
            />
          </div>
        )

      case 'tags':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <p className="text-sm text-gray-500 mb-2">Keywords to categorize your campaign</p>
            <MultiSelect
              value={watch('tags') || []}
              onChange={(value) => setValue('tags', value)}
              options={[
                "Leadership",
                "Management",
                "Development",
                "Innovation",
                "Culture",
                "Performance",
                "Team Building",
                "Communication",
                "Strategy"
              ].map(tag => ({ label: tag, value: tag }))}
              placeholder="Add tags..."
            />
            {errors.tags && (
              <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
            )}
          </div>
        )

      case 'preferredChannels':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Channels</label>
            <p className="text-sm text-gray-500 mb-2">Where you want to promote your campaign</p>
            <MultiSelect
              value={watch('preferredChannels') || []}
              onChange={(value) => setValue('preferredChannels', value)}
              options={PREFERRED_CHANNELS.map(channel => ({ 
                label: channel, 
                value: channel,
                description: getChannelDescription(channel) // Optional: Add descriptions
              }))}
              placeholder="Select at least one channel"
            />
            {errors.preferredChannels && (
              <p className="text-red-500 text-sm mt-1">{errors.preferredChannels.message}</p>
            )}
          </div>
        )

      case 'kpis':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">KPIs</label>
            <p className="text-sm text-gray-500 mb-2">Metrics to measure campaign success</p>
            <MultiSelect
              value={watch('kpis') || []}
              onChange={(value) => setValue('kpis', value)}
              options={KPI_OPTIONS.map(kpi => ({ 
                label: kpi, 
                value: kpi 
              }))}
              placeholder="Select KPIs..."
            />
            {errors.kpis && (
              <p className="text-red-500 text-sm mt-1">{errors.kpis.message}</p>
            )}
          </div>
        )

      // Default case for other fields
      default:
        return (
          <div>
            <label className="block text-sm font-medium mb-1">
            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1')}
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
            <p className="text-red-500 text-sm mt-1">{errors[fieldName]?.message}</p>
          )}
        </div>
      )
    }
  }

  // Add these helper functions
  const getFieldDescription = (fieldName: keyof FormData): string => {
    const descriptions: Record<keyof FormData, string> = {
      title: "A clear, memorable name for your campaign",
      description: "A clear description of your campaign",
      coverImage: "An image to represent your campaign",
      coach: "The name of the lead coach",
      startDate: "When the campaign starts",
      endDate: "When the campaign ends",
      maxParticipants: "Maximum number of participants",
      duration: "How long the campaign will run",
      sessions: "Number of sessions in the campaign",
      campaignGoals: "What you want to achieve with this campaign",
      targetAudience: "Who this campaign is designed to reach",
      messageStyle: "The tone and style of your campaign communications",
      budget: "Estimated budget range for the campaign ($USD)",
      timeline: "Expected duration of the campaign",
      preferredChannels: "Where you want to promote your campaign",
      kpis: "Metrics to measure campaign success",
      tags: "Keywords to categorize your campaign"
    }
    return descriptions[fieldName] || ""
  }

  const getFieldPlaceholder = (fieldName: keyof FormData): string => {
    const placeholders: Record<keyof FormData, string> = {
      title: "e.g., Summer Leadership Workshop 2024",
      description: "e.g., This campaign aims to provide leadership training...",
      coverImage: "Upload a cover image",
      coach: "e.g., Sarah Chen",
      startDate: "Select start date",
      endDate: "Select end date",
      maxParticipants: "e.g., 50",
      duration: "Select duration",
      sessions: "e.g., 8",
      campaignGoals: "Select your goals",
      targetAudience: "e.g., Mid-level managers in tech industry",
      messageStyle: "Select style",
      budget: "Select budget range",
      timeline: "Select timeline",
      preferredChannels: "Select channels",
      kpis: "Select KPIs",
      tags: "Add tags"
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
    console.log('Current step:', currentStep);
    console.log('Current fields:', formSteps[currentStep - 1].fields);
    
    try {
      const fields = formSteps[currentStep - 1].fields as Array<keyof FormData>;
      const isValid = await trigger(fields);
      console.log('Form validation result:', isValid);
      
      // Log current field values
      const currentValues = fields.reduce((acc, field) => {
        const value = watch(field);
        if (value !== undefined) {
          acc[field] = value;
        }
        return acc;
      }, {} as Record<keyof FormData, any>);
      console.log('Current field values:', currentValues);

      if (isValid) {
        if (currentStep === 2) { // Campaign Details step
          const startDate = watch('startDate');
          const endDate = watch('endDate');
          
          console.log('Date validation:', { startDate, endDate });
          
          if (startDate && endDate) {
            const minDuration = calculateMinDuration(startDate, endDate);
            console.log('Duration in days:', minDuration);
            
            if (minDuration < 7) {
              toast.error("Campaign duration must be at least 1 week");
              return;
            }
          }
        }
        
        // Only increment if we're not at the last step
        if (currentStep < formSteps.length) {
          setCurrentStep(prev => prev + 1);
          toast.success(`Step ${currentStep} completed!`);
        }
      } else {
        // Log specific validation errors
        console.log('Form errors:', errors);
        toast.error("Please fill in all required fields correctly", {
          description: Object.values(errors)
            .map(error => error?.message)
            .filter(Boolean)
            .join(', ')
        });
      }
    } catch (error) {
      console.error('Error in handleNextClick:', error);
      toast.error("An error occurred while processing the form");
    }
  };

  // Add this form submission handler
  const onSubmit = async (data: FormData) => {
    console.log('Form data before submission:', data);
    
    const formattedData = {
      ...data,
      campaignGoals: data.campaignGoals || [],
      preferredChannels: data.preferredChannels || [],
      kpis: data.kpis || []
    };

    console.log('Formatted data:', formattedData);

    setIsSubmitting(true)
    try {
      console.log('Making API request with formatted data:', formattedData)
      const response = await fetch('/api/campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      })

      console.log('API response status:', response.status)
      const result = await response.json()
      console.log('API response data:', result)

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed')
      }

      setShowSuccess(true)

    } catch (error: any) {
      console.error('Submission error:', error)
      toast.error("Failed to submit campaign", {
        description: error.message || "Please try again later",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Add this helper function at the top with other constants
  const getChannelDescription = (channel: string) => ({
    "One-on-one Sessions": "Personal coaching sessions",
    "Group Workshops": "Interactive group learning",
    "Virtual Meetings": "Online video sessions",
    "In-person Training": "Face-to-face sessions",
    "Online Courses": "Self-paced learning",
    "Hybrid Learning": "Mix of virtual and in-person"
  })[channel];

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