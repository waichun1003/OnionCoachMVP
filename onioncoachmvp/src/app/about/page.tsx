"use client"

import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ArrowRight, Target, Heart, Lightbulb, Users, Trophy, Zap } from 'lucide-react'
import { AnimatedSection } from "@/components/ui/animated-section"
import { motion, useAnimation, useInView } from "framer-motion"
import React from 'react'
import { LucideIcon } from 'lucide-react'

const teamMembers = [
  {
    name: "Xuan Zhang\n" +
        " (Joanna)",
    role: "Co-founder & Chief Guide",
    image: "/images/CEO.png",
    bio: "Experienced journey architect with 15+ years guiding tech leaders",
    linkedin: "https://www.linkedin.com/in/joannazhang1213/"
  },
  {
    name: "Ka Ki Wong\n" +
        " (Kee)",
    role: "Co-founder & Innovation Guide",
    image: "/images/kee.png",
    bio: "Master mentor specializing in transformative leadership journeys",
    linkedin: "https://www.linkedin.com/in/kee-ka-ki-wong-3682ba11b/"
  },
  {
    name: "Wai Chun Cheng (Samuel)",
    role: "Co-founder & Development Guide",
    image: "/images/samuel.jpg",
    bio: "Expert in crafting transformative professional journeys",
    linkedin: "https://www.linkedin.com/in/samuel-cheng-4a1270a9/"
  },
  {
    name: "Dan yu \n" +
        "(Dana)",
    role: "Platform Head Coach & Experience Guide",
    image: "/images/dana.png",
    bio: "Architect of breakthrough growth experiences",
    linkedin: "https://www.linkedin.com/in/danyu/"
  }
]

const impactMetrics = [
  { number: "10k+", label: "Heroes Guided" },
  { number: "95%", label: "Journey Success Rate" },
  { number: "500+", label: "Expert Guides" },
  { number: "30+", label: "Journey Paths" }
]

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface CoreValueProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div
      className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-4">
        <motion.div 
          className="p-3 bg-[#E86C3A]/10 rounded-lg"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-6 h-6 text-[#E86C3A]" />
        </motion.div>
        <div>
          <motion.h3 
            className="text-xl font-seminormal mb-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

const CoreValue: React.FC<CoreValueProps> = ({ icon: Icon, title, description, color }) => {
  return (
    <motion.div
      className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className={`w-20 h-20 mx-auto mb-6 rounded-full ${color} flex items-center justify-center`}
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="h-10 w-10 text-white" />
      </motion.div>
      <h3 className="text-2xl font-normal text-white mb-4 text-center">{title}</h3>
      <p className="text-white/90 text-lg text-center leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Unified gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#EDE6DC] via-white to-[#EDE6DC]/50" />
      
      <div className="relative z-10">
        <NavBar />
        <main className="pt-32">
          {/* Hero Section */}
          <AnimatedSection delay={100}>
            <section className="container mx-auto px-4 mb-20">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h1 
                  className="text-4xl md:text-5xl font-normal mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Guiding Heroes Through Their{" "}
                  <span className="italic font-serif text-[#E86C3A]">Professional Journey</span>
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-600 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  We're revolutionizing professional development by guiding ambitious individuals through their 
                  hero's journey, helping them overcome challenges and emerge transformed.
                </motion.p>
              </div>
            </section>
          </AnimatedSection>

          {/* Impact Metrics */}
          <AnimatedSection delay={200}>
            <section className="container mx-auto px-4 mb-20">
              <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {impactMetrics.map((metric, index) => (
                  <motion.div 
                    key={index}
                    className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
                      transition: { duration: 0.2 }
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <motion.div 
                      className="text-4xl font-normal text-[#E86C3A] mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 100,
                        delay: 0.2 + index * 0.1 
                      }}
                    >
                      {metric.number}
                    </motion.div>
                    <motion.div 
                      className="text-gray-600"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {metric.label}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </section>
          </AnimatedSection>

          {/* Story Section with card background */}
          <AnimatedSection delay={300}>
            <section className="container mx-auto px-4 mb-20">
              <Card className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm">
                <CardContent className="p-12">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div 
                      className="relative h-[500px] rounded-2xl overflow-hidden"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Image
                        src="/images/about.png"
                        alt="Our story"
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <h2 className="text-3xl font-normal mb-6">
                        Our{" "}
                        <span className="italic font-serif bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Origin Story</span>
                      </h2>
                      <p className="text-lg text-gray-600 mb-6">
                        Founded in 2023, Onion Coaching emerged from a profound understanding: every professional's 
                        path is a hero's journey waiting to unfold. We recognized that while individuals faced 
                        increasingly complex career challenges, traditional coaching wasn't equipped to guide them 
                        through their unique transformative journeys.
                      </p>
                      <p className="text-lg text-gray-600">
                        Our platform bridges this gap by connecting heroes with experienced guides who have 
                        mastered their own journeys. We believe every professional deserves a mentor who can 
                        illuminate the path ahead and guide them through their transformation.
                      </p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </AnimatedSection>

          {/* Core Values Section */}
          <AnimatedSection delay={400}>
            <section className="container mx-auto px-4 py-20">
              <motion.h2 
                className="text-4xl font-normal mb-16 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Our Core{" "}
                <span className="italic font-serif text-[#E86C3A]">Values</span>
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                  {
                    icon: Target,
                    color: "bg-[#E86C3A]",
                    title: "Transformative Guidance",
                    description: "We guide each individual through their unique hero's journey with expertise and care"
                  },
                  {
                    icon: Heart,
                    color: "bg-[#E86C3A]",
                    title: "Journey Partnership",
                    description: "We walk alongside our heroes, supporting them through every challenge and triumph"
                  },
                  {
                    icon: Lightbulb,
                    color: "bg-[#E86C3A]",
                    title: "Continuous Evolution",
                    description: "We adapt our guidance to meet each hero's unique path and changing needs"
                  }
                ].map((value, index) => (
                  <motion.div
                    key={value.title}
                    className="p-8 rounded-2xl bg-white/90 shadow-lg backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 mx-auto mb-6 rounded-full ${value.color} flex items-center justify-center`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <value.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-normal text-gray-900 mb-4 text-center">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>
          </AnimatedSection>

          {/* Team Section with card background */}
          <AnimatedSection delay={500}>
            <section className="container mx-auto px-4 py-20">
              <Card className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm">
                <CardContent className="p-12">
                  <h2 className="text-3xl font-normal mb-12 text-center">
                    Meet Our{" "}
                    <span className="italic font-serif text-[#E86C3A]">Team</span>
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {teamMembers.map((member, index) => (
                      <motion.div 
                        key={member.name}
                        className="text-center group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <motion.div 
                          className="relative w-48 h-48 rounded-full overflow-hidden mx-auto mb-4 
                            ring-4 ring-[#E86C3A]/20 group-hover:ring-[#E86C3A] transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                          <motion.div
                            className="absolute inset-0 bg-[#E86C3A]/0 group-hover:bg-[#E86C3A]/10"
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                        <motion.h3 
                          className="font-normal text-lg mb-1"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          {member.name}
                        </motion.h3>
                        <p className="text-[#6B46C1] font-medium mb-2">{member.role}</p>
                        <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                        <motion.a 
                          href={member.linkedin}
                          className="text-[#6B46C1] hover:text-[#5B3AA8] inline-flex items-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Connect
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </motion.a>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </AnimatedSection>

          {/* Why Choose Us Section */}
          <AnimatedSection delay={600}>
            <section className="container mx-auto px-4 py-20">
              <Card className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm">
                <CardContent className="p-12">
                  <div className="max-w-6xl mx-auto">
                    <motion.h2 
                      className="text-4xl font-normal mb-12 text-center"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      Why Choose{" "}
                      <span className="italic font-serif text-[#E86C3A]">Onion</span>
                    </motion.h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      <FeatureCard
                        icon={Users}
                        title="Expert Journey Guides"
                        description="Our mentors are seasoned heroes who've mastered their own professional journeys"
                      />
                      <FeatureCard
                        icon={Zap}
                        title="Personalized Path Mapping"
                        description="Our approach ensures each hero finds their perfect guide for their unique journey"
                      />
                      <FeatureCard
                        icon={Trophy}
                        title="Proven Transformations"
                        description="90% of our heroes achieve breakthrough growth within their journey"
                      />
                      <FeatureCard
                        icon={Lightbulb}
                        title="Journey Innovation"
                        description="We combine timeless wisdom with modern tools to enhance your transformation"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </AnimatedSection>

          {/* CTA Section */}
          <AnimatedSection delay={700}>
            <section className="container mx-auto px-4 py-20">
              <Card className="max-w-4xl mx-auto overflow-hidden bg-[#F5F0FF]">
                <CardContent className="p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <h2 className="text-4xl font-normal mb-6 text-gray-900">
                      Ready to Begin Your
                      <span className="block italic font-serif text-[#E86C3A]">Hero's Journey?</span>
                    </h2>
                    <p className="text-xl mb-12 text-gray-700">
                      Join a community of heroes transforming their professional lives through expert guidance
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
                      {[
                        { icon: Users, text: "Connect with Expert Guides" },
                        { icon: Trophy, text: "Achieve Your Career Goals" },
                        { icon: Zap, text: "Get Personalized Guidance" },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex flex-col items-center gap-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-14 h-14 rounded-full bg-[#E86C3A]/10 flex items-center justify-center">
                            <item.icon className="h-7 w-7 text-[#E86C3A]" />
                          </div>
                          <span className="text-gray-800 font-medium text-center">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>

                    <Button
                      size="lg"
                      className="rounded-full bg-[#E86C3A] hover:bg-[#D55C2A] text-white px-8 h-12"
                      onClick={() => window.location.href = '/register'}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </section>
          </AnimatedSection>
        </main>

        <footer className="relative z-10 bg-white">
          <Footer />
        </footer>
      </div>
    </div>
  )
}  