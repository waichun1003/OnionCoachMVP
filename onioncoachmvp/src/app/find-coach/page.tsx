"use client"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection } from "@/components/ui/animated-section"
import { ArrowRight, Star, Rocket, Medal, TrendingUp, CheckCircle, Calendar, Users, Trophy } from 'lucide-react'
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { StatsSection } from "@/components/stats-section"
import { toast } from "sonner"
import { WaitlistForm } from "@/components/waitlist-form"
import { useRouter } from 'next/navigation'

export default function FindCoachPage() {
  const [showWaitlistForm, setShowWaitlistForm] = useState(false)
  const router = useRouter()

  const handleWaitlistJoin = () => {
    router.push('/register')
  }

  const handleLearnMore = () => {
    router.push('/about')
  }

  const handleDiscordJoin = () => {
    toast.success(
      <div className="flex flex-col gap-1">
        <p className="font-seminormal">Welcome to Our Community! 💫</p>
        <p className="text-sm text-gray-500">
          Redirecting you to Discord...
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
    );

    setTimeout(() => {
      window.open("https://discord.gg/your-community", "_blank");
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-orange-50 overflow-x-hidden flex flex-col">
      <NavBar />
      <main className="pt-16 xs:pt-20 sm:pt-28 min-h-[calc(100vh-64px)] flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="container mx-auto px-1 sm:px-2 md:px-4 mb-6 sm:mb-10 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-4xl lg:text-5xl font-normal mb-2 sm:mb-4 tracking-tight break-words">
                <span className="block break-words">Begin Your Hero's</span>
                <span className="block italic font-serif text-purple-600 text-base xs:text-lg sm:text-xl md:text-3xl break-words">Journey to Excellence</span>
              </h1>
              <p className="text-sm xs:text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 break-words">
                Transform your professional challenges into opportunities with expert guidance through your unique journey
              </p>
              <Button 
                size="lg"
                className="rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-3 sm:px-6 h-10 sm:h-12 text-sm sm:text-base w-full mb-2"
                onClick={handleWaitlistJoin}
              >
                Join Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mt-4 sm:mt-6 lg:mt-0"
            >
              <div className="relative z-10">
                <Image
                  src="/images/findCoach.png"
                  width={500}
                  height={500}
                  alt="Career growth illustration"
                  className="rounded-3xl w-full h-auto max-w-full mx-auto"
                />
              </div>
              
              {/* Floating Elements - hide on mobile */}
              <motion.div
                className="absolute top-20 -left-10 z-20 hidden md:block"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Card className="bg-white/90 backdrop-blur-sm w-56 p-4 rounded-xl shadow-lg border-none">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <Star className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-base font-seminormal bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                        Exclusive Access
                      </div>
                      <div className="text-sm text-gray-600">Join 500+ Early Members</div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                className="absolute bottom-20 -right-10 z-20 hidden md:block"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Card className="bg-white/90 backdrop-blur-sm w-56 p-4 rounded-xl shadow-lg border-none">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-base font-seminormal bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
                        Coming Soon
                      </div>
                      <div className="text-sm text-gray-600">Priority Access Available</div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Background Elements */}
              <div className="absolute inset-0 z-0 hidden md:block">
                <motion.div
                  className="absolute top-10 right-10 w-72 h-72 bg-purple-200 rounded-full opacity-50 blur-3xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-10 left-10 w-72 h-72 bg-orange-200 rounded-full opacity-50 blur-3xl"
                  animate={{ 
                    scale: [1.2, 1, 1.2],
                    rotate: [0, -90, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-1 sm:px-2 md:px-4 mb-6 sm:mb-10 md:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 md:gap-8 items-stretch">
            {[
              {
                icon: <Medal className="h-8 w-8 text-purple-600" />,
                title: "Expert Mentors",
                description: "Connect with guides who understand your unique hero's journey and help navigate your path"
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
                title: "Transformative Growth",
                description: "Turn every challenge into an opportunity for breakthrough personal development"
              },
              {
                icon: <Rocket className="h-8 w-8 text-blue-600" />,
                title: "Journey Milestones",
                description: "Achieve meaningful progress with structured guidance and accountability"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden border-none shadow-lg h-full w-full mb-2 md:mb-0">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/20 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                  <CardContent className="relative p-2 xs:p-3 sm:p-4 h-full flex flex-col">
                    <motion.div 
                      className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-base xs:text-lg font-normal mb-1 break-words">{feature.title}</h3>
                    <p className="text-gray-600 text-xs xs:text-sm sm:text-base break-words">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section with enhanced visuals */}
        <StatsSection />

        {/* Coach Showcase */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-normal mb-6">
                  Meet Your Guides:
                  <span className="block italic font-serif text-purple-600">Experienced Mentors</span>
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Our expert coaches are ready to guide you through each stage of your professional hero's journey
                </p>
                <div className="grid gap-4">
                  {[
                    "Personalized journey mapping and guidance",
                    "Support through your challenges and victories",
                    "Tools to unlock your hidden potential",
                    "Priority access to transformative coaching"
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-600">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Updated image container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-purple-50">
                  <Image
                    src="/images/findCoach2.png"
                    alt="Professional Coach"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    quality={100}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center center'
                    }}
                  />
                  {/* Optional overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <AnimatedSection delay={800}>
          <section className="container mx-auto px-4 py-20">
            <Card className="max-w-6xl mx-auto overflow-hidden bg-[#F5F0FF]">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2">
                  <div className="relative p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-4xl font-normal mb-6 text-gray-900">
                        Ready to Begin Your
                        <span className="block italic font-serif text-purple-600">Hero's Journey?</span>
                      </h2>
                      <p className="text-xl mb-8 text-gray-700">
                        Join our community of fellow heroes and:
                      </p>
                      <ul className="space-y-6 mb-8">
                        {[
                          { icon: Calendar, text: "Learn from experienced guides and mentors" },
                          { icon: Users, text: "Share your journey with like-minded heroes" },
                          { icon: Trophy, text: "Celebrate milestones and transformations" },
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center space-x-4"
                          >
                            <div className="flex-shrink-0">
                              <item.icon className="h-6 w-6 text-[#7C3AED]" />
                            </div>
                            <span className="text-lg text-gray-800">{item.text}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          size="lg"
                          className="rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 h-12 text-base font-medium inline-flex items-center justify-center"
                          onClick={handleDiscordJoin}
                        >
                          Join Discord Community
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button 
                          size="lg"
                          variant="outline"
                          className="rounded-full border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white px-6 h-12 text-base font-medium inline-flex items-center justify-center"
                          onClick={handleLearnMore}
                        >
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                    
                    {/* Decorative Elements */}
                    <motion.div
                      className="absolute top-0 right-0 w-64 h-64 bg-purple-400 rounded-full opacity-20"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0]
                      }}
                      transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 rounded-full opacity-20"
                      animate={{ 
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -90, 0]
                      }}
                      transition={{ duration: 8, repeat: Infinity }}
                    />
                  </div>
                  <div className="relative overflow-hidden bg-[#7C3AED]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-8 w-full">
                        <h3 className="text-2xl font-normal text-white mb-6">What Our Waitlist Members Say</h3>
                        <motion.div 
                          className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
                        >
                          <p className="text-white text-lg italic mb-4">
                            "The hero's journey approach completely changed how I view career challenges. Every obstacle became an opportunity for growth. The community support has been invaluable!"
                          </p>
                          <p className="text-[#FCD34D] font-seminormal">- Sarah T., Transformation Story</p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </AnimatedSection>

        <AnimatePresence>
          {showWaitlistForm && (
            <WaitlistForm
                onClose={() => setShowWaitlistForm(false)} selectedTier={""}            />
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

