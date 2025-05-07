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
              Embark on a structured journey of professional transformation with expert guidance at every step.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our proven methodology combines personalized coaching, actionable strategies, and continuous support to help you achieve breakthrough results in your career.
            </p>
          </motion.div>

          {/* 4 Simple Steps */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {[
              {
                title: "Self-Discovery",
                description: "Begin your journey by understanding your unique strengths, values, and aspirations through expert guidance."
              },
              {
                title: "Goal Alignment",
                description: "Define clear, achievable goals that resonate with your personal and professional vision."
              },
              {
                title: "Skill Mastery",
                description: "Develop essential skills and strategies with structured guidance from experienced mentors."
              },
              {
                title: "Ongoing Support & Progress",
                description: "Receive continuous feedback, track your progress, and adjust your plan to ensure lasting success."
              }
            ].map((step, idx) => (
              <motion.div
                key={step.title}
                className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-[#E86C3A]/10 flex items-center justify-center mb-4 text-2xl font-semibold text-[#E86C3A]">{idx + 1}</div>
                <h3 className="text-xl font-normal mb-2">{step.title}</h3>
                <p className="text-gray-600 text-base">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Program Features Section */}
          <motion.h3 className="text-2xl font-normal text-center mb-8 mt-16">
            Why Choose Our Program?
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {platformStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className={`w-14 h-14 flex items-center justify-center rounded-full mb-4 ${stat.color}`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-2xl font-semibold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-lg font-medium text-gray-700 mb-2">{stat.label}</div>
                <p className="text-gray-600 text-base">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

