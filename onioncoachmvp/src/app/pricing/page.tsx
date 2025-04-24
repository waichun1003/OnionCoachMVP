"use client"

import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ArrowRight, Zap, Shield, Gift } from 'lucide-react'
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { toast } from "sonner"
import { AnimatedSection } from "@/components/ui/animated-section"
import { WaitlistForm } from "@/components/waitlist-form"
import { PricingWaitlistForm } from "@/components/pricing-waitlist-form"
import { useState } from "react"

const pricingTiers = [
  {
    name: "Starter",
    price: "49",
    originalPrice: "99",
    description: "Perfect for individuals starting their coaching journey",
    features: [
      "1-on-1 Coaching Session (1/month)",
      "Basic Career Assessment",
      "Resume Review",
      "LinkedIn Profile Optimization",
      "Email Support",
      "Access to Resource Library"
    ],
    industryBenefits: "Ideal for early-career professionals and career changers",
    caseStudy: {
      title: "Career Transition Success",
      result: "Secured new role within 3 months"
    },
    featured: false,
    color: "bg-purple-600",
    icon: Zap
  },
  {
    name: "Professional",
    price: "99",
    originalPrice: "199",
    description: "For professionals seeking comprehensive career development",
    features: [
      "1-on-1 Coaching Sessions (2/month)",
      "Advanced Career Assessment",
      "Interview Preparation",
      "Career Strategy Planning",
      "Priority Email Support",
      "Access to Premium Resources",
      "Monthly Group Workshops"
    ],
    industryBenefits: "Perfect for mid-career professionals and managers",
    caseStudy: {
      title: "Leadership Advancement",
      result: "Achieved promotion within 6 months"
    },
    featured: true,
    color: "bg-[#E86C3A]",
    icon: Shield
  },
  {
    name: "Enterprise",
    price: "Custom",
    originalPrice: "",
    description: "Tailored solutions for organizational development",
    features: [
      "Custom Coaching Program",
      "Team Development Sessions",
      "Leadership Training",
      "Progress Tracking Dashboard",
      "Dedicated Success Manager",
      "Custom Workshops",
      "Priority Support"
    ],
    industryBenefits: "Designed for teams and organizations",
    caseStudy: {
      title: "Team Performance",
      result: "30% improvement in team engagement"
    },
    featured: false,
    customPricing: true,
    enterpriseFeatures: [
      "Custom program design",
      "Team deployment",
      "Progress analytics",
      "ROI tracking"
    ],
    color: "bg-blue-600",
    icon: Gift
  }
]

const comparisonFeatures = [
  {
    feature: "1-on-1 Coaching Sessions",
    starter: "1/month",
    professional: "2/month",
    enterprise: "Custom"
  },
  {
    feature: "Career Assessment",
    starter: "Basic",
    professional: "Advanced",
    enterprise: "Custom"
  },
  {
    feature: "Support Response Time",
    starter: "Within 48h",
    professional: "Within 24h",
    enterprise: "Priority"
  },
  {
    feature: "Group Workshops",
    starter: "❌",
    professional: "Monthly",
    enterprise: "Custom"
  },
  {
    feature: "Resource Library",
    starter: "Basic",
    professional: "Premium",
    enterprise: "Custom"
  },
  {
    feature: "Progress Tracking",
    starter: "Basic",
    professional: "Advanced",
    enterprise: "Custom"
  },
  {
    feature: "Success Manager",
    starter: "❌",
    professional: "Shared",
    enterprise: "Dedicated"
  }
]

function ParticleEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#E86C3A]/20 rounded-full"
          initial={{ 
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            scale: 0 
          }}
          animate={{ 
            x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
            y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
            scale: [0, 1, 0]
          }}
          transition={{ 
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export default function PricingPage() {
  const [showWaitlistForm, setShowWaitlistForm] = useState(false)
  const [selectedTier, setSelectedTier] = useState<"Starter" | "Professional" | "Enterprise">("Starter")

  const handleWaitlistJoin = (tier: "Starter" | "Professional" | "Enterprise") => {
    setSelectedTier(tier)
    setShowWaitlistForm(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-orange-50">
      <NavBar />
      <main className="pt-32">
        <AnimatedSection delay={100}>
          <section className="container mx-auto px-4 mb-20">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-normal mb-6">
                Exclusive Pre-Launch
                <span className="block italic font-serif text-[#E86C3A]">Pricing Tiers</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join our waitlist today and save 40% off our regular pricing
              </p>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <section className="container mx-auto px-4 mb-20">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative">
                    {tier.featured && (
                      <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                        <div className="bg-[#E86C3A] text-white px-8 py-2 rounded-full font-seminormal text-lg shadow-lg">
                          Most Popular
                        </div>
                      </div>
                    )}
                    <Card 
                      className={`relative overflow-hidden transition-all duration-500 h-full transform hover:scale-105 group perspective-1000`}
                    >
                      <motion.div
                        className="relative w-full h-full transform-gpu preserve-3d"
                        whileHover={{ 
                          rotateX: [-2, 2],
                          rotateY: [-2, 2],
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut"
                        }}
                      >
                        <ParticleEffect />

                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-orange-50/30 group-hover:via-purple-50/30 group-hover:to-orange-50/30 transition-all duration-500 opacity-0 group-hover:opacity-100" />

                        <CardContent className="p-8 relative backdrop-blur-sm">
                          <motion.div 
                            className={`w-16 h-16 rounded-full ${tier.color} flex items-center justify-center mb-6`}
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ 
                              type: "spring",
                              stiffness: 300,
                              damping: 15
                            }}
                          >
                            <tier.icon className="w-8 h-8 text-white" />
                          </motion.div>

                          <motion.div 
                            className="mb-6 relative group transform-gpu"
                            whileHover={{ 
                              z: 20,
                              scale: 1.02,
                              transition: { duration: 0.2 }
                            }}
                          >
                            <h2 className="text-3xl font-normal mb-4 group-hover:text-[#E86C3A] transition-colors duration-300">
                              {tier.name}
                            </h2>
                            <div className="relative">
                              <motion.div 
                                className="flex items-baseline gap-2 mb-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <span className="text-4xl font-normal">${tier.price}</span>
                                <span className="text-xl text-gray-600">/month</span>
                              </motion.div>
                              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-purple-400 to-orange-400 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
                            </div>
                          </motion.div>

                          <ul className="space-y-4 relative">
                            {tier.features.map((feature, index) => (
                              <motion.li 
                                key={feature}
                                className="flex items-center gap-3 p-2 rounded-lg relative overflow-hidden"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ 
                                  x: 10,
                                  backgroundColor: "rgba(232, 108, 58, 0.05)"
                                }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <motion.div 
                                  className={`w-6 h-6 rounded-full ${tier.color} flex items-center justify-center flex-shrink-0`}
                                  whileHover={{ scale: 1.2, rotate: 180 }}
                                  whileTap={{ scale: 0.8 }}
                                >
                                  <Check className="w-4 h-4 text-white" />
                                </motion.div>
                                <span className="text-lg group-hover:text-gray-900 transition-colors duration-300">
                                  {feature}
                                </span>
                              </motion.li>
                            ))}
                          </ul>

                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                            <div className="absolute inset-0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                          </div>
                        </CardContent>
                      </motion.div>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <section className="container mx-auto px-4 mb-20">
            <h2 className="text-3xl font-normal mb-12 text-center">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full max-w-5xl mx-auto">
                <thead>
                  <tr className="border-b-2">
                    <th className="p-4 text-left">Features</th>
                    <th className="p-4 text-center">Starter</th>
                    <th className="p-4 text-center">Professional</th>
                    <th className="p-4 text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr 
                      key={index} 
                      className={`border-b hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-gray-50/50' : ''
                      }`}
                    >
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center">{row.starter}</td>
                      <td className="p-4 text-center font-medium text-[#E86C3A]">{row.professional}</td>
                      <td className="p-4 text-center">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <section className="container mx-auto px-4 py-20">
            <Card className="max-w-5xl mx-auto overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2">
                  <div className="relative p-12 bg-gradient-to-br from-[#E86C3A] to-[#D55C2A] text-white overflow-hidden">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-3xl font-normal mb-4">Lock In Your Early Bird Pricing</h2>
                      <p className="text-lg mb-8 text-white/90">
                        Join our waitlist today and secure up to 40% off our regular pricing. 
                        Choose your preferred tier when we launch!
                      </p>
                      <div className="space-y-4">
                        <Button 
                          size="lg"
                          className="w-full rounded-full bg-white text-[#E86C3A] hover:bg-orange-50"
                          onClick={() => handleWaitlistJoin("Starter")}
                        >
                          Join Priority Waitlist
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <p className="text-sm text-white/80 text-center">
                          Limited time offer • No credit card required
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="relative bg-gradient-to-br from-orange-50 to-white p-12 overflow-hidden">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-normal">Early Bird Benefits:</h3>
                      <ul className="space-y-4">
                        {[
                          "40% discount on all pricing tiers",
                          "Priority access when we launch",
                          "Exclusive founder's community access",
                          "Special launch event invitation"
                        ].map((benefit) => (
                          <li key={benefit} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#E86C3A] flex items-center justify-center flex-shrink-0">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <section className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-normal mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6 text-left">
                {[
                  {
                    q: "What happens after I join the waitlist?",
                    a: "You'll receive a confirmation email with your position on the waitlist and exclusive updates about our launch. We'll notify you when it's time to claim your early bird pricing."
                  },
                  {
                    q: "How long will the early bird pricing last?",
                    a: "The early bird pricing is exclusively for waitlist members and will be honored for the lifetime of your subscription, as long as your account remains active."
                  },
                  {
                    q: "Can I change my tier after signing up?",
                    a: "Yes, you can upgrade or downgrade your tier at any time while maintaining your early bird discount percentage."
                  },
                  {
                    q: "What payment methods do you accept?",
                    a: "We accept all major credit cards, debit cards, and digital payment methods including PayPal and Stripe."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h3 className="font-seminormal text-lg mb-2">{faq.q}</h3>
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>
      <Footer />
      <AnimatePresence>
        {showWaitlistForm && (
          <PricingWaitlistForm
            selectedTier={selectedTier}
            onClose={() => setShowWaitlistForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

