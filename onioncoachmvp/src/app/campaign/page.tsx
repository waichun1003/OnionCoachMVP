"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Rocket, Target, Users, Zap, ArrowRight, ArrowLeft, Check, Mail, Calendar, Bell, Sparkles, Trophy, BarChart, Send, LineChart, Clock, ArrowUpRight, Activity } from 'lucide-react'
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { CampaignForm } from "@/components/campaign-form"
import { CoachForm } from "@/components/coach-form"
import { AnimatedSection } from "@/components/ui/animated-section"
import { FeaturedCampaignCard } from "@/components/featured-campaign-card"
import { CampaignCard } from "@/components/campaign-card"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"

// Define local interface to avoid conflict
interface Campaign {
  id: string;
  title: string;
  description: string;
  coverImage: string | null;
  coach: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  currentParticipants: number;
  duration: string;
  sessions: number;
  status: string;
  campaignGoals: string[];
  targetAudience: string;
  budget: string;
  timeline: string;
  preferredChannels: string[];
  messageStyle: string;
  kpis: string[];
  createdAt: string;
  updatedAt: string | null;
  tags: string[];
}

// When displaying dates, convert string to Date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

export default function CampaignPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isCoachFormOpen, setIsCoachFormOpen] = useState(false)

  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  const activeScrollRef = useRef<HTMLDivElement>(null)
  const campaignScrollRef = useRef<HTMLDivElement>(null)

  const [currentActiveCampaign, setCurrentActiveCampaign] = useState<Campaign | null>(null)

  const { data: campaignsData, isLoading } = useQuery<Campaign[]>({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const response = await fetch('/api/campaign');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.data; // Access the data property from the response
    },
  });

  useEffect(() => {
    if (campaignsData) {
      setCampaigns(campaignsData);
    }
  }, [campaignsData]);

  useEffect(() => {
    setMounted(true)
    fetchCampaigns()
  }, [])

    const fetchCampaigns = async () => {
      try {
      const response = await fetch('/api/campaign')
        const result = await response.json()
        console.log('API Response:', result)
        if (result.success) {
        console.log('Setting campaigns:', result.data)
          setCampaigns(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch campaigns:', error)
      } finally {
        setLoading(false)
      }
    }

  const activeCampaigns = useMemo(() => {
    console.log('Raw campaigns:', campaigns);
    const transformed = campaigns
      .filter(c => c.status.toUpperCase() === 'ACTIVE')
    .map(campaign => ({
      ...campaign,
      startDate: new Date(campaign.startDate),
      endDate: new Date(campaign.endDate),
        campaignGoals: campaign.campaignGoals || [],
        tags: Array.isArray(campaign.tags) 
          ? campaign.tags.map(tag => typeof tag === 'string' ? tag : String(tag))
          : ['Leadership', 'Management', 'Development'],
        preferredChannels: campaign.preferredChannels || [],
        kpis: campaign.kpis || [],
        currentParticipants: campaign.currentParticipants || 0
      }));
    console.log('Transformed active campaigns:', transformed);
    return transformed;
  }, [campaigns]);

  const upcomingCampaigns = useMemo(() => {
    return campaigns
      .filter(c => c.status.toUpperCase() === 'UPCOMING')
      .map(campaign => ({
        ...campaign,
        startDate: new Date(campaign.startDate).toISOString(),
        endDate: new Date(campaign.endDate).toISOString(),
        campaignGoals: campaign.campaignGoals || [],
        tags: Array.isArray(campaign.tags) 
          ? campaign.tags.map(tag => typeof tag === 'string' ? tag : String(tag))
          : ['Leadership', 'Management', 'Development'],
        preferredChannels: campaign.preferredChannels || [],
        kpis: campaign.kpis || [],
        currentParticipants: campaign.currentParticipants || 0
      }));
  }, [campaigns]);

  const scrollContainerBy = (container: HTMLElement, scrollOffset: number) => {
    container.scrollBy({ left: scrollOffset, behavior: 'smooth' })
  }

  useEffect(() => {
    console.log('Raw campaigns:', campaigns)
    console.log('Active campaigns:', activeCampaigns)
    console.log('Upcoming campaigns:', upcomingCampaigns)
  }, [campaigns, activeCampaigns, upcomingCampaigns])

  useEffect(() => {
    if (activeCampaigns.length > 0) {
      // Convert dates to strings if they aren't already
      const campaign = {
        ...activeCampaigns[0],
        startDate: activeCampaigns[0].startDate.toString(),
        endDate: activeCampaigns[0].endDate.toString()
      };
      setCurrentActiveCampaign(campaign);
    }
  }, [activeCampaigns]);

  // Navigation handlers
  const handlePrevCampaign = () => {
    if (!currentActiveCampaign) return;
    const currentIndex = activeCampaigns.findIndex(c => c.id === currentActiveCampaign.id);
    const prevIndex = (currentIndex - 1 + activeCampaigns.length) % activeCampaigns.length;
    const campaign = {
      ...activeCampaigns[prevIndex],
      startDate: activeCampaigns[prevIndex].startDate.toString(),
      endDate: activeCampaigns[prevIndex].endDate.toString()
    };
    setCurrentActiveCampaign(campaign);
  };

  const handleNextCampaign = () => {
    // Similar to handlePrevCampaign
  };

  if (!mounted) return null

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-50 via-white to-orange-50">
      <NavBar />
      <main className="relative w-full">
        {/* Hero Section */}
        <AnimatedSection delay={100}>
          <section className="w-full container mx-auto px-4 pt-32 pb-20 relative overflow-hidden">
            <motion.div
              className="absolute -top-20 -left-0 w-screen h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
                x: [0, 20, 0],
                y: [0, -20, 0]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-0 -right-0 w-screen h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"
              animate={{ 
                scale: [1.2, 1, 1.2],
                rotate: [0, -90, 0],
                x: [0, -20, 0],
                y: [0, 20, 0]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="max-w-4xl mx-auto text-center relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-6xl font-seminormal mb-6">
                  Partner With Us to Create
                  <motion.span 
                    className="block text-[#E86C3A] italic font-normal relative"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Impactful Campaigns
                    <motion.div className="absolute -right-8 -top-8">
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                    </motion.div>
                  </motion.span>
                </h1>
                <p className="text-xl font-normal text-gray-600 mb-12 max-w-2xl mx-auto">
                  Are you a coach with innovative ideas? Share your campaign vision with us, and let's collaborate to create meaningful impact together.
                </p>

                <AnimatePresence>
                  {!isFormOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Button
                        size="lg"
                        className="rounded-full bg-[#E86C3A] hover:bg-[#D55C2A] text-white px-8"
                        onClick={() => setIsFormOpen(true)}
                      >
                        Submit Your Campaign Idea
                        <Send className="ml-2 h-5 w-5" />
                      </Button>
                    </motion.div>
                  )}
                  {isFormOpen && <CampaignForm onClose={() => setIsFormOpen(false)} />}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>
        </AnimatedSection>

        {/* Campaigns Section */}
        <AnimatedSection delay={200}>
          <section className="container mx-auto px-4 py-20">
            <h2 className="text-3xl font-normal mb-12 text-center">Campaigns on Onion</h2>
            {loading ? (
              <div className="animate-pulse space-y-8">
                {/* Add loading skeletons here */}
              </div>
            ) : (
              <div className="space-y-16 max-w-7xl mx-auto">
                {/* Active Campaign Section */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-normal">Active Campaign</h2>
                    <Badge variant="secondary" className="bg-white">
                      Featured
                    </Badge>
                  </div>
                  
                  {activeCampaigns.length > 0 && currentActiveCampaign ? (
                    <div className="relative group">
                      {/* Left scroll button */}
                      <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-20">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full bg-white shadow-lg hover:bg-white/90 transition-all duration-200 opacity-0 group-hover:opacity-100"
                          onClick={handlePrevCampaign}
                        >
                          <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </Button>
                      </div>

                      <motion.div
                        key={currentActiveCampaign.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className="w-full"
                      >
                        <Card className="w-full overflow-hidden bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-100/50">
                          <div className="relative h-[400px] w-full">
                            <Image
                              src={currentActiveCampaign.coverImage || '/images/default-campaign.jpg'}
                              alt={currentActiveCampaign.title}
                              fill
                              className="object-cover brightness-75"
                              priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            <div className="absolute bottom-0 p-8 text-white">
                              <span className="px-3 py-1 bg-[#E86C3A] rounded-full text-sm font-medium">
                                Active Campaign
                              </span>
                              <h2 className="text-4xl font-semibold mt-4">{currentActiveCampaign.title}</h2>
                              <p className="text-white/80 mt-3 text-lg">{currentActiveCampaign.description}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-16 p-8">
                            <div>
                              <h3 className="text-lg font-medium mb-3">Campaign Details</h3>
                              <div className="space-y-3 text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  <span>{formatDate(currentActiveCampaign.startDate)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  <span>{currentActiveCampaign.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4" />
                                  <span>{currentActiveCampaign.currentParticipants}/{currentActiveCampaign.maxParticipants} participants</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h3 className="text-lg font-medium mb-3">Tags</h3>
                              <div className="flex flex-wrap gap-2">
                                {currentActiveCampaign.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h3 className="text-lg font-medium mb-3">Led by</h3>
                              <p className="text-gray-600">{currentActiveCampaign.coach}</p>
                              <Button 
                                className="w-full bg-[#E86C3A] hover:bg-[#D55C2A] text-white mt-4"
                                onClick={() => window.location.href = `/campaign/${currentActiveCampaign.id}`}
                              >
                                Join Campaign
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </motion.div>

                      {/* Right scroll button */}
                      <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-20">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full bg-white shadow-lg hover:bg-white/90 transition-all duration-200 opacity-0 group-hover:opacity-100"
                          onClick={handleNextCampaign}
                        >
                          <ArrowRight className="h-5 w-5 text-gray-600" />
                        </Button>
                      </div>

                      {/* Gradient overlays */}
                      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
                      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No active campaigns available
                  </div>
                )}
                </div>

                {/* Upcoming Campaigns Section */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-normal">Upcoming Campaigns</h2>
                    <Badge variant="secondary" className="bg-white">
                      {upcomingCampaigns.length} Upcoming
                    </Badge>
                  </div>
                  
                  {upcomingCampaigns.length > 0 ? (
                    <div className="relative group">
                      {/* Left scroll button */}
                      <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-20">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full bg-white shadow-lg hover:bg-white/90 transition-all duration-200 opacity-0 group-hover:opacity-100"
                          onClick={() => {
                            if (campaignScrollRef.current) {
                              const scrollWidth = campaignScrollRef.current.clientWidth * 0.8
                              campaignScrollRef.current.scrollBy({
                                left: -scrollWidth,
                                behavior: 'smooth'
                              })
                            }
                          }}
                        >
                          <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </Button>
                      </div>
                      
                      {/* Scroll container */}
                      <div 
                        ref={campaignScrollRef}
                        className="scroll-container flex overflow-x-auto gap-6 pb-4 px-2"
                        style={{
                          scrollSnapType: 'x mandatory',
                          WebkitOverflowScrolling: 'touch',
                        }}
                      >
                        {upcomingCampaigns.map((campaign, index) => (
                          <motion.div
                            key={campaign.id}
                            className="campaign-card flex-none w-[350px]"
                            style={{ 
                              scrollSnapAlign: 'start',
                              scrollSnapStop: 'always'
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: index * 0.1,
                              ease: [0.25, 0.1, 0.25, 1]
                            }}
                          >
                            <CampaignCard 
                              {...campaign}
                              startDate={campaign.startDate}
                              endDate={campaign.endDate}
                              createdAt={campaign.createdAt}
                              updatedAt={campaign.updatedAt || null}
                            />
                          </motion.div>
                        ))}
                      </div>

                      {/* Right scroll button */}
                      <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-20">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full bg-white shadow-lg hover:bg-white/90 transition-all duration-200 opacity-0 group-hover:opacity-100"
                          onClick={() => {
                            if (campaignScrollRef.current) {
                              const scrollWidth = campaignScrollRef.current.clientWidth * 0.8
                              campaignScrollRef.current.scrollBy({
                                left: scrollWidth,
                                behavior: 'smooth'
                              })
                            }
                          }}
                        >
                          <ArrowRight className="h-5 w-5 text-gray-600" />
                        </Button>
                      </div>

                      {/* Gradient overlays */}
                      <div className="absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
                      <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No upcoming campaigns available
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </AnimatedSection>

        {/* Coach Cooperation Section */}
        <AnimatedSection delay={300}>
          <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-normal mb-6">Join Our Coaching Network</h2>
              <p className="text-xl text-gray-600 mb-8">
                Are you passionate about transforming lives through coaching? Join our platform as a mentor and help shape the future of professional development.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    icon: Users,
                    title: "Build Your Community",
                    description: "Connect with dedicated professionals and expand your coaching influence."
                  },
                  {
                    icon: Trophy,
                    title: "Share Your Expertise",
                    description: "Lead specialized campaigns and workshops in your area of expertise."
                  },
                  {
                    icon: Target,
                    title: "Grow Together",
                    description: "Access resources, peer support, and opportunities for professional development."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="inline-flex p-3 rounded-full bg-white shadow-md mb-4">
                      <item.icon className="w-6 h-6 text-[#E86C3A]" />
                    </div>
                    <h3 className="text-xl font-normal mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
              <Button
                size="lg"
                className="rounded-full bg-[#E86C3A] hover:bg-[#D55C2A] text-white px-8"
                onClick={() => setIsCoachFormOpen(true)}
              >
                Apply as a Coach
                <Send className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                Join our growing network of professional coaches and mentors
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Benefits Section */}
        <AnimatedSection delay={400}>
          <section className="container mx-auto px-4 py-20">
            <h2 className="text-3xl font-normal mb-12 text-center">
              Why Choose Onion for Your Campaigns?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="overflow-hidden bg-gradient-to-br from-[#E86C3A] to-[#D55C2A] text-white h-full">
                  <CardContent className="p-8 h-full flex flex-col">
                    <h3 className="text-2xl font-normal mb-6">Campaign Benefits</h3>
                    <ul className="space-y-4">
                      {[
                        { icon: Target, text: "Reach your ideal audience with precision targeting" },
                        { icon: Users, text: "Engage participants with interactive content" },
                        { icon: Zap, text: "Boost your visibility and brand awareness" },
                        { icon: Rocket, text: "Launch and scale your services effortlessly" },
                      ].map((item, index) => (
                        <motion.li 
                          key={index}
                          className="flex items-center gap-4"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="p-2 bg-white/20 rounded-lg">
                            <item.icon className="w-6 h-6" />
                          </div>
                          <span className="text-lg">{item.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="h-full">
                  <CardContent className="p-8 h-full flex flex-col">
                    <h3 className="text-2xl font-normal mb-6">How It Works</h3>
                    <ol className="space-y-4">
                      {[
                        "Design your campaign strategy with our team",
                        "Set up your campaign on the Onion platform",
                        "Launch and promote across multiple channels",
                        "Engage with participants in real-time",
                        "Analyze results and optimize for future campaigns",
                      ].map((step, index) => (
                        <motion.li 
                          key={index}
                          className="flex items-center gap-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-purple-600 font-normal">{index + 1}</span>
                          </div>
                          <span className="text-lg">{step}</span>
                        </motion.li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatePresence>
          {isCoachFormOpen && <CoachForm onClose={() => setIsCoachFormOpen(false)} />}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

