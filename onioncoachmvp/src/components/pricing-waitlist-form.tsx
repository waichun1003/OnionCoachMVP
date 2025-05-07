"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, ArrowRight, Star, Zap, Shield, Gift } from "lucide-react"
import { toast } from "sonner"
import { useModal } from "@/components/ui/modal-context"

interface PricingWaitlistFormProps {
  selectedTier: "Starter" | "Professional" | "Enterprise"
  onClose: () => void
}

export function PricingWaitlistForm({ selectedTier: initialTier, onClose }: PricingWaitlistFormProps) {
  const { setModalOpen } = useModal()
  const [selectedTier, setSelectedTier] = useState(initialTier)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    linkedIn: "",
    goals: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setModalOpen(true)
    return () => setModalOpen(false)
  }, [setModalOpen])

  const pricingOptions = [
    {
      tier: "Starter",
      price: "49",
      originalPrice: "99",
      description: "Perfect for individuals starting their coaching journey",
      icon: Zap,
      color: "bg-purple-600",
      lightColor: "bg-purple-100"
    },
    {
      tier: "Professional",
      price: "99",
      originalPrice: "199",
      description: "For professionals seeking comprehensive career development",
      icon: Shield,
      color: "bg-[#E86C3A]",
      lightColor: "bg-orange-100"
    },
    {
      tier: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for organizational development",
      icon: Gift,
      color: "bg-blue-600",
      lightColor: "bg-blue-100"
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/pricing-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          selectedTier,
          submittedAt: new Date().toISOString()
        }),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      toast.success(
        <div className="flex flex-col gap-1">
          <p className="font-seminormal">Welcome to the Waitlist! 🎉</p>
          <p className="text-sm text-gray-500">
            We'll keep you updated on our launch.
          </p>
        </div>,
        {
          duration: 3000,
          className: "bg-white rounded-xl shadow-lg border-none",
          position: "top-center",
          style: {
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
          }
        }
      )
      onClose()
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        className: "bg-white rounded-xl shadow-lg border-none",
        style: {
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
        }
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gradient-to-br from-white to-orange-50/50 rounded-2xl shadow-xl max-w-2xl w-full relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-10 right-10 w-72 h-72 bg-purple-200 rounded-full opacity-30 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-72 h-72 bg-orange-200 rounded-full opacity-30 blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 flex flex-col max-h-[90vh]">
          <div className="p-8 pb-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 hover:bg-black/5"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#E86C3A]/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-[#E86C3A]" />
              </div>
              <div>
                <h2 className="text-2xl font-normal">Join Our Waitlist</h2>
                <p className="text-gray-600">Get early access and exclusive pricing</p>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto px-8 pb-8 custom-scrollbar">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Pricing Tier Selection */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {pricingOptions.map((option) => {
                  const isSelected = selectedTier === option.tier
                  const IconComponent = option.icon

                  return (
                    <motion.div
                      key={option.tier}
                      className={`relative cursor-pointer rounded-xl p-4 transition-all duration-200 ${
                        isSelected 
                          ? 'bg-orange-50/50' 
                          : 'border-2 border-gray-200 hover:border-gray-300 bg-white/50'
                      }`}
                      onClick={() => setSelectedTier(option.tier as typeof selectedTier)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className={`w-10 h-10 rounded-full ${option.lightColor} flex items-center justify-center`}>
                          <IconComponent className={`w-5 h-5 ${isSelected ? 'text-[#E86C3A]' : 'text-gray-600'}`} />
                        </div>
                        <div className="font-medium">{option.tier}</div>
                        <div className="text-sm text-gray-600">
                          ${option.price}
                          {option.originalPrice && (
                            <span className="text-xs line-through ml-2 text-gray-400">
                              ${option.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      {isSelected && (
                        <motion.div
                          layoutId="selectedBorder"
                          className="absolute inset-0 border-2 border-[#E86C3A] rounded-xl pointer-events-none"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  )
                })}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/50 border-gray-200 focus:ring-[#E86C3A] focus:border-[#E86C3A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/50 border-gray-200 focus:ring-[#E86C3A] focus:border-[#E86C3A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-white/50 border-gray-200 focus:ring-[#E86C3A] focus:border-[#E86C3A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Current Role <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    placeholder="Software Engineer, PM..."
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="bg-white/50 border-gray-200 focus:ring-[#E86C3A] focus:border-[#E86C3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  LinkedIn Profile <span className="text-red-500">*</span>
                </label>
                <Input
                  required
                  placeholder="https://linkedin.com/in/..."
                  value={formData.linkedIn}
                  onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                  className="bg-white/50 border-gray-200 focus:ring-[#E86C3A] focus:border-[#E86C3A]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  What are your main goals? <span className="text-sm text-gray-500">(Optional)</span>
                </label>
                <textarea
                  className="w-full rounded-md border border-gray-200 bg-white/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E86C3A] focus:border-[#E86C3A]"
                  rows={3}
                  placeholder="Tell us what you hope to achieve..."
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#E86C3A] hover:bg-[#D55C2A] text-white rounded-full h-12 flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.02]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Join Priority Waitlist
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E86C3A]/10 flex items-center justify-center flex-shrink-0">
                    <Star className="w-3 h-3 text-[#E86C3A]" />
                  </div>
                  <span className="text-sm text-gray-600">Get 40% off launch pricing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E86C3A]/10 flex items-center justify-center flex-shrink-0">
                    <Star className="w-3 h-3 text-[#E86C3A]" />
                  </div>
                  <span className="text-sm text-gray-600">Priority access to features</span>
                </div>
              </div>

              <p className="text-xs text-center text-gray-500">
                By joining, you agree to receive updates about our launch and services.
                <br />We respect your privacy and will never share your information.
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const style = document.createElement('style')
style.textContent = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(232, 108, 58, 0.2);
    border-radius: 20px;
    border: 2px solid transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(232, 108, 58, 0.4);
  }
`
document.head.appendChild(style) 