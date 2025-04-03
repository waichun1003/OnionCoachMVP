"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Compass, Target, Shield, Clock, Award, BookOpen } from 'lucide-react'

const platformStats = [
  {
    icon: Clock,
    value: "1-on-1",
    label: "Personalized Sessions",
    description: "Exclusive coaching sessions tailored to your unique needs, challenges, and career aspirations. Get undivided attention and personalized strategies.",
    color: "bg-purple-500"
  },
  {
    icon: Award,
    value: "5+ Years",
    label: "Expert Coaches",
    description: "Work with seasoned professionals who bring extensive industry experience and proven track records in leadership development and career transformation.",
    color: "bg-[#E86C3A]"
  },
  {
    icon: BookOpen,
    value: "12 Weeks",
    label: "Structured Program",
    description: "A comprehensive program designed to deliver measurable results through weekly sessions, actionable assignments, and continuous progress tracking.",
    color: "bg-blue-500"
  }
]

const journeyStages = [
  {
    icon: Compass,
    title: "Self-Discovery",
    description: "Begin your journey by understanding your unique strengths, values, and aspirations through expert guidance.",
    color: "bg-purple-500"
  },
  {
    icon: Target,
    title: "Goal Alignment",
    description: "Define clear, achievable goals that resonate with your personal and professional vision.",
    color: "bg-[#E86C3A]"
  },
  {
    icon: Shield,
    title: "Skill Mastery",
    description: "Develop essential skills and strategies with structured guidance from experienced mentors.",
    color: "bg-blue-500"
  }
]

export function StatsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-normal tracking-tight mb-4">
              Get fully set up in 4 simple steps
              <span className="block italic font-serif text-[#E86C3A] mt-2">Your Journey to Success</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              Embark on a structured journey of professional transformation with expert guidance at every step
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our proven methodology combines personalized coaching, actionable strategies, and continuous support to help you achieve breakthrough results in your career.
            </p>
          </motion.div>

          {/* Platform Stats */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {platformStats.map((stat, index) => (
              <Card key={stat.label} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${stat.color}`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold">{stat.value}</h3>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Journey Stages */}
          <div className="grid md:grid-cols-3 gap-8">
            {journeyStages.map((stage, index) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${stage.color} rounded-xl flex items-center justify-center mb-4`}>
                      <stage.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-normal mb-2">{stage.title}</h3>
                    <p className="text-gray-600">{stage.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

