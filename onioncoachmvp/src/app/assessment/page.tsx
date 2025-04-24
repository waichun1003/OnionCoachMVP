'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight } from 'lucide-react'
import { AssessmentResult } from "@/components/assessment-result"

interface AssessmentData {
  personalityType: string;
  strengths: string[];
  challenges: string[];
  recommendedPath: string;
  scores: Record<string, number>;
}

export default function AssessmentPage() {
  const [activeDemo, setActiveDemo] = useState(0)
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false)
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null)
  const [assessmentAnswers, setAssessmentAnswers] = useState({
    leadership: 0,
    communication: 0,
    workLifeBalance: 0,
    productivity: 0,
    stressManagement: 0,
    teamwork: 0,
    innovation: 0,
    decisionMaking: 0
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const calculateResults = () => {
    return {
      personalityType: determinePersonalityType(assessmentAnswers),
      strengths: determineStrengths(assessmentAnswers),
      challenges: determineChallenges(assessmentAnswers),
      recommendedPath: determineRecommendedPath(assessmentAnswers),
      scores: assessmentAnswers
    }
  }

  const handleAnswerChange = (category: string, value: number) => {
    setAssessmentAnswers(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const nextDemo = () => {
    if (activeDemo === 6) {
      const results = calculateResults()
      setAssessmentData(results)
      setIsAssessmentComplete(true)
    } else {
      setActiveDemo(prev => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-[#EDE6DC] p-8">
      {isAssessmentComplete && assessmentData ? (
        <AssessmentResult 
          name={assessmentData.personalityType} 
          scores={assessmentData.scores}
          onSchedule={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Life Wheel Assessment Design Showcase</h1>
            <p className="text-gray-600">Click through to see each screen design</p>
          </div>

          {/* Progress bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-purple-600"
                animate={{ width: `${((activeDemo + 1) / 7) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="relative h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden">
            <AnimatePresence mode="wait">
              {/* Introduction Screen */}
              {activeDemo === 0 && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0 p-12"
                >
                  <div className="max-w-2xl mx-auto text-center">
                    <div className="flex justify-center mb-8">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-full" />
                        <span className="text-xl font-bold text-purple-600">Onion</span>
                      </div>
                    </div>
                    <h2 className="text-4xl font-bold mb-4">Life Wheel Assessment</h2>
                    <p className="text-xl italic mb-8 text-gray-600">A Self-Reflection Tool</p>
                    <p className="text-gray-600 mb-12">
                      The Life Wheel is a powerful self-reflection tool designed to help you evaluate
                      key areas of your life and identify areas for growth and balance. By rating your
                      satisfaction in different aspects—such as career, health, relationships, and
                      personal growth—you can gain clarity on where you're thriving and where
                      adjustments may be needed.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Name Input Screen */}
              {activeDemo === 1 && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0 p-12"
                >
                  <div className="max-w-xl mx-auto">
                    <div className="flex justify-center mb-8">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-full" />
                        <span className="text-xl font-bold text-purple-600">Onion</span>
                      </div>
                    </div>
                    <div className="text-center mb-12">
                      <h3 className="text-sm uppercase text-gray-500 mb-2">Getting started</h3>
                      <h2 className="text-3xl font-bold">Tell us a little about yourself</h2>
                    </div>
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <label className="text-2xl whitespace-nowrap">My name is</label>
                        <Input className="text-xl h-12" placeholder="Enter your name" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Feelings Selection Screen */}
              {activeDemo === 2 && (
                <motion.div
                  key="feelings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0 p-12"
                >
                  <div className="max-w-xl mx-auto">
                    <div className="flex justify-center mb-8">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-full" />
                        <span className="text-xl font-bold text-purple-600">Onion</span>
                      </div>
                    </div>
                    <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold mb-2">What brings you here today?</h2>
                      <p className="text-gray-600">Select all that apply.</p>
                    </div>
                    <div className="space-y-4">
                      {["Feeling depressed", "Not feeling social", "Feeling stressed", "Feeling constantly worried", "Feeling burnt out"].map((feeling) => (
                        <Card key={feeling} className="transition-all hover:shadow-md">
                          <CardContent className="p-4">
                            <label className="flex items-center space-x-3">
                              <Checkbox />
                              <span>{feeling}</span>
                            </label>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Emotional State Screen */}
              {activeDemo === 3 && (
                <motion.div
                  key="emotional"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0 p-12"
                >
                  <div className="max-w-xl mx-auto">
                    <div className="flex justify-center mb-8">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-full" />
                        <span className="text-xl font-bold text-purple-600">Onion</span>
                      </div>
                    </div>
                    <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold mb-2">How have you been feeling lately?</h2>
                      <p className="text-gray-600">Drag the emotional bar to answer it.</p>
                    </div>
                    <div className="space-y-12">
                      {["Energy", "Stress", "Appetite"].map((metric) => (
                        <div key={metric} className="space-y-4">
                          <label className="text-lg font-medium">{metric}</label>
                          <Slider defaultValue={[50]} max={100} step={1} />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Life Goals Screen */}
              {activeDemo === 4 && (
                <motion.div
                  key="goals"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0 p-12"
                >
                  <div className="max-w-3xl mx-auto">
                    <div className="flex justify-center mb-8">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-full" />
                        <span className="text-xl font-bold text-purple-600">Onion</span>
                      </div>
                    </div>
                    <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold mb-2">What is your life goal?</h2>
                      <p className="text-gray-600">Select all that apply.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      {[
                        { icon: "💰", title: "Earnings" },
                        { icon: "📈", title: "Expertise" },
                        { icon: "🏆", title: "Leadership" },
                      ].map((goal) => (
                        <Card key={goal.title} className="cursor-pointer hover:shadow-lg transition-all">
                          <CardContent className="p-6 text-center">
                            <div className="text-4xl mb-4">{goal.icon}</div>
                            <h3 className="font-semibold">{goal.title}</h3>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Statistics Screen */}
              {activeDemo === 5 && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0 p-12"
                >
                  <div className="max-w-2xl mx-auto text-center">
                    <div className="flex justify-center mb-8">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-full" />
                        <span className="text-xl font-bold text-purple-600">Onion</span>
                      </div>
                    </div>
                    <h2 className="text-2xl italic mb-8">You're not alone</h2>
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-7xl font-bold text-purple-600 mb-8"
                    >
                      63%
                    </motion.div>
                    <p className="text-xl leading-relaxed">
                      young women in Hong Kong are dissatisfied with their physical appearance; they are
                      also likely to perceive themselves as larger than they are
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Results Screen */}
              {activeDemo === 6 && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0"
                >
                  <div className="h-full">
                    <div className="bg-purple-600 text-white p-12">
                      <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12">
                          <div>
                            <h2 className="text-2xl mb-6">
                              Hi Mary, your quiz results match your ideal life
                            </h2>
                            <div className="text-6xl font-bold mb-6 border-2 border-yellow-400 inline-block px-4 py-2">
                              80%
                            </div>
                            <p className="mb-8">
                              Your progress already aligns an impressive 80% with your ideal life growth—a
                              testament to your hard work. However, there's still room for improvement in
                              some key areas.
                            </p>
                            <Button variant="secondary" size="lg">
                              Schedule a free coaching
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </div>
                          <div className="aspect-square bg-purple-500/50 rounded-xl">
                            {/* Placeholder for radar chart */}
                            <div className="h-full flex items-center justify-center text-white/50">
                              Radar Chart Visualization
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-12">
                      <div className="max-w-5xl mx-auto">
                        <div className="mb-8">
                          <h3 className="text-3xl mb-2">Based on your need,</h3>
                          <p className="text-2xl italic">our improvement tips.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                          {[1, 2, 3].map((i) => (
                            <Card key={i} className="overflow-hidden">
                              <div className="aspect-video bg-gray-100" />
                              <CardContent className="p-4">
                                <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm mb-2">
                                  Health and Fitness
                                </span>
                                <h4 className="font-semibold mb-2">
                                  Your 10 step approach to combat runners pain
                                </h4>
                                <p className="text-gray-600 text-sm">
                                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                  accusantium doloremque
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <Button size="lg" onClick={nextDemo} className="bg-purple-600 hover:bg-purple-700">
                Next Screen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Screen indicators */}
          <div className="flex justify-center gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === activeDemo ? "bg-purple-600" : "bg-gray-300"
                }`}
                onClick={() => setActiveDemo(i)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Helper functions to analyze assessment data
function determinePersonalityType(scores: Record<string, number>): string {
  const avg = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length;
  const leadershipScore = scores.leadership || 0;
  const innovationScore = scores.innovation || 0;
  const communicationScore = scores.communication || 0;

  if (leadershipScore >= 8 && communicationScore >= 7) return "Natural Leader";
  if (innovationScore >= 8 && scores.productivity >= 7) return "Innovation Champion";
  if (avg > 7) return "High Achiever";
  if (avg > 5) return "Growth Seeker";
  return "Emerging Professional";
}

function determineStrengths(scores: Record<string, number>): string[] {
  const strengthMap: Record<string, string> = {
    leadership: "Leadership & Management",
    communication: "Interpersonal Communication",
    workLifeBalance: "Work-Life Harmony",
    productivity: "Productivity & Efficiency",
    stressManagement: "Stress Management",
    teamwork: "Team Collaboration",
    innovation: "Innovation & Creativity",
    decisionMaking: "Strategic Decision Making"
  };

  return Object.entries(scores)
    .filter(([_, score]) => score >= 7)
    .map(([category]) => strengthMap[category] || category);
}

function determineChallenges(scores: Record<string, number>): string[] {
  const challengeMap: Record<string, string> = {
    leadership: "Leadership Development",
    communication: "Communication Skills",
    workLifeBalance: "Work-Life Balance",
    productivity: "Time Management",
    stressManagement: "Stress & Anxiety Management",
    teamwork: "Team Dynamics",
    innovation: "Creative Problem Solving",
    decisionMaking: "Decision Making Process"
  };

  return Object.entries(scores)
    .filter(([_, score]) => score <= 5)
    .map(([category]) => challengeMap[category] || category);
}

function determineRecommendedPath(scores: Record<string, number>): string {
  const strengths = Object.entries(scores);
  const avgScore = strengths.reduce((sum, [_, score]) => sum + score, 0) / strengths.length;

  if (scores.leadership >= 7 && scores.teamwork >= 6) 
    return "Executive Leadership Track";
  if (scores.innovation >= 7 && scores.productivity >= 6) 
    return "Innovation & Strategy";
  if (scores.communication >= 7 && scores.teamwork >= 6) 
    return "Team Leadership Development";
  if (avgScore <= 5) 
    return "Core Skills Foundation";
  
  return "Professional Growth";
}
