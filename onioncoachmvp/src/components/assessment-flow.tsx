"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { AssessmentResult } from "@/components/assessment-result"
import { WaitlistForm } from "@/components/waitlist-form"
import { 
  determinePersonalityType,
  determineStrengths,
  determineChallenges,
  determineRecommendedPath 
} from '@/components/assessment-result'

// Define and export categoryColors at the top level
export const categoryColors = {
  "Family Clan": "#9BEA5E",
  "Adventure Party": "#5EC4EA",
  "Love Quest": "#17CDBA",
  "Hero's Journey": "#26FFE6",
  "Side Hustle Dungeon": "#FF4D88",
  "Treasure Vault": "#CA88FF",
  "Character Development": "#EA755E",
  "Health XP Bar": "#EADE5E"
};

export function getContrastColor(hexColor: string): string {
  // Remove the hash if it exists
  const color = hexColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  
  // Calculate luminance - standard formula for perceived brightness
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black for bright colors, white for dark colors
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

const feelings = [
  "Feeling depressed",
  "Not feeling social",
  "Feeling stressed",
  "Feeling constantly worried",
  "Feeling burnt out"
]

const lifeGoals = [
  {
    title: "Financial Growth",
    image: "/icons/financial.svg",
    description: "Improve earnings and wealth",
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M37.3333 25.3333H30.6667C29.1939 25.3333 28 26.5272 28 28C28 29.4728 29.1939 30.6667 30.6667 30.6667H33.3333C34.8061 30.6667 36 31.8605 36 33.3333C36 34.8061 34.8061 36 33.3333 36H26.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 25.3333V22.6667M32 36V38.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Career Development",
    image: "/icons/career.svg",
    description: "Advance professional skills",
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M53.3333 21.3333H10.6667C9.19391 21.3333 8 22.5272 8 24V50.6667C8 52.1394 9.19391 53.3333 10.6667 53.3333H53.3333C54.8061 53.3333 56 52.1394 56 50.6667V24C56 22.5272 54.8061 21.3333 53.3333 21.3333Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M42.6667 21.3333V16C42.6667 14.5272 41.4728 13.3333 40 13.3333H24C22.5272 13.3333 21.3333 14.5272 21.3333 16V21.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Leadership",
    image: "/icons/leadership.svg",
    description: "Develop management abilities",
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M42.6667 56V50.6667C42.6667 47.7217 41.4024 44.8985 39.1521 42.8731C36.9018 40.8478 33.8986 39.7083 30.7778 39.7083H13.8889C10.7681 39.7083 7.76492 40.8478 5.51462 42.8731C3.26432 44.8985 2 47.7217 2 50.6667V56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22.3333 28.75C28.9607 28.75 34.3333 23.3774 34.3333 16.75C34.3333 10.1226 28.9607 4.75 22.3333 4.75C15.7059 4.75 10.3333 10.1226 10.3333 16.75C10.3333 23.3774 15.7059 28.75 22.3333 28.75Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M62 56V50.6667C61.9932 48.2146 61.1748 45.8362 59.6584 43.8963C58.142 41.9564 56.0077 40.5651 53.6111 39.9583" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M45.1111 4.95833C47.5126 5.56166 49.6517 6.95216 51.1707 8.89392C52.6897 10.8357 53.5085 13.2175 53.5085 15.6729C53.5085 18.1283 52.6897 20.5101 51.1707 22.4519C49.6517 24.3936 47.5126 25.7841 45.1111 26.3875" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Work-Life Balance",
    image: "/icons/balance.svg",
    description: "Better time management",
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 18.6667V32L40 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Mental Wellness",
    image: "/icons/wellness.svg",
    description: "Improve emotional health",
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M45.3333 10.6667H18.6667C14.2485 10.6667 10.6667 14.2485 10.6667 18.6667V45.3333C10.6667 49.7515 14.2485 53.3333 18.6667 53.3333H45.3333C49.7515 53.3333 53.3333 49.7515 53.3333 45.3333V18.6667C53.3333 14.2485 49.7515 10.6667 45.3333 10.6667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 32C24 33.4728 25.1939 34.6667 26.6667 34.6667C28.1394 34.6667 29.3333 33.4728 29.3333 32C29.3333 30.5272 28.1394 29.3333 26.6667 29.3333C25.1939 29.3333 24 30.5272 24 32Z" fill="currentColor"/>
        <path d="M34.6667 32C34.6667 33.4728 35.8606 34.6667 37.3333 34.6667C38.8061 34.6667 40 33.4728 40 32C40 30.5272 38.8061 29.3333 37.3333 29.3333C35.8606 29.3333 34.6667 30.5272 34.6667 32Z" fill="currentColor"/>
        <path d="M25.3333 42.6667C26.6667 40 29.3333 38.6667 32 38.6667C34.6667 38.6667 37.3333 40 38.6667 42.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Physical Health",
    image: "/icons/health.svg",
    description: "Better fitness and nutrition",
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M53.3333 29.3333H42.6667V18.6667C42.6667 17.1939 41.4728 16 40 16H24C22.5272 16 21.3333 17.1939 21.3333 18.6667V29.3333H10.6667C9.19391 29.3333 8 30.5272 8 32V48C8 49.4728 9.19391 50.6667 10.6667 50.6667H21.3333V61.3333C21.3333 62.8061 22.5272 64 24 64H40C41.4728 64 42.6667 62.8061 42.6667 61.3333V50.6667H53.3333C54.8061 50.6667 56 49.4728 56 48V32C56 30.5272 54.8061 29.3333 53.3333 29.3333Z" 
              stroke="currentColor" 
              strokeWidth="3"
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
      </svg>
    )
  }
]

const emotions = [
  { 
    name: "Energy", 
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 10V16L20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    name: "Stress", 
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 21C21 21 19.5 19 16 19C12.5 19 11 21 11 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 12H20.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    name: "Appetite", 
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26.6667 9.33333H5.33333C4.59695 9.33333 4 9.93028 4 10.6667V25.3333C4 26.0697 4.59695 26.6667 5.33333 26.6667H26.6667C27.403 26.6667 28 26.0697 28 25.3333V10.6667C28 9.93029 27.403 9.33333 26.6667 9.33333Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21.3333 9.33333V6.66667C21.3333 5.93029 20.7364 5.33333 20 5.33333H12C11.2636 5.33333 10.6667 5.93029 10.6667 6.66667V9.33333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
]

const lifeWheelQuestions = [
  {
    category: "Family Clan",
    question: "How strong is your Family Clan Quest line?",
    description: "Your family represents your home base and support clan. Rate how well you're managing your family relationships and clan dynamics.",
    npcState: "Lone Wolf: You're playing solo, disconnected from your family clan. Communication is minimal, and family gatherings feel like low-level encounters.",
    heroState: "Clan Leader: You've mastered family dynamics, fostering strong bonds and creating memorable clan experiences. Your family serves as your strongest alliance.",
    statistic: {
      percentage: "67%",
      fact: "of players feel their family clan support system needs strengthening"
    }
  },
  {
    category: "Adventure Party",
    question: "How's your Social Party Formation?",
    description: "Your friends are your adventure party members. Rate how well you're building and maintaining your social connections.",
    npcState: "Solo Player: You rarely party up with others, missing out on multiplayer experiences and social quests.",
    heroState: "Party Leader: You've built a strong network of reliable party members, organizing epic social quests and maintaining meaningful friendships.",
    statistic: {
      percentage: "72%",
      fact: "of players struggle to maintain an active friend party"
    }
  },
  {
    category: "Love Quest",
    question: "How's your Romance Questline progressing?",
    description: "Your romantic life is like a special questline. Rate how satisfied you are with your romantic relationships or pursuit thereof.",
    npcState: "Love Novice: Your romance stats are underdeveloped, feeling stuck in tutorial mode with relationships.",
    heroState: "Love Champion: You've mastered the art of romance, maintaining a fulfilling relationship or confidently pursuing meaningful connections.",
    statistic: {
      percentage: "58%",
      fact: "of players feel their romance questline needs more attention"
    }
  },
  {
    category: "Hero's Journey",
    question: "How's your Career Campaign going?",
    description: "Your career is your main questline. Rate your progress in professional development and job satisfaction.",
    npcState: "Quest Starter: Stuck in repetitive side quests, lacking direction in your career path.",
    heroState: "Quest Master: You're excelling in your chosen path, taking on challenging missions and achieving meaningful victories.",
    statistic: {
      percentage: "63%",
      fact: "of players feel trapped in repetitive career side quests"
    }
  },
  {
    category: "Side Hustle Dungeon",
    question: "How's your Extra Income Dungeon Crawl?",
    description: "Your side projects are like bonus dungeons. Rate how well you're managing additional income streams and passion projects.",
    npcState: "Dungeon Novice: Barely exploring additional income opportunities, sticking to the main questline only.",
    heroState: "Dungeon Master: Successfully managing multiple income streams, turning side quests into valuable treasure runs.",
    statistic: {
      percentage: "76%",
      fact: "of players want to explore side hustle dungeons but don't know where to start"
    }
  },
  {
    category: "Treasure Vault",
    question: "How's your Gold Management?",
    description: "Your finances are your treasure vault. Rate how well you're managing your resources and savings.",
    npcState: "Empty Inventory: Struggling with resource management, living paycheck to paycheck.",
    heroState: "Master Treasurer: Expert at managing resources, building wealth, and maintaining a healthy emergency fund.",
    statistic: {
      percentage: "69%",
      fact: "of players struggle with maintaining their treasure vault"
    }
  },
  {
    category: "Character Development",
    question: "How's your Personal Growth Skill Tree?",
    description: "Your personal development is your skill tree. Rate how well you're investing in self-improvement and learning.",
    npcState: "Level 1 Mindset: Minimal investment in personal growth, stuck with basic skills.",
    heroState: "Legendary Mindset: Constantly leveling up skills, seeking knowledge, and evolving as a person.",
    statistic: {
      percentage: "81%",
      fact: "of players want to level up their personal development skills"
    }
  },
  {
    category: "Health XP Bar",
    question: "How's your Health and Energy Management?",
    description: "Your health is your XP bar. Rate how well you're maintaining your physical and mental wellbeing.",
    npcState: "Low HP: Neglecting health stats, running low on energy, and struggling with basic wellness quests.",
    heroState: "Max HP: Maintaining peak health stats through regular exercise, proper nutrition, and stress management.",
    statistic: {
      percentage: "74%",
      fact: "of players need to improve their health stats management"
    }
  }
]

// First, let's fix the ScoreSlider component
const ScoreSlider = ({ onScore }: { onScore: (score: number) => void }) => {
  const [localScore, setLocalScore] = useState<number>(5)

  useEffect(() => {
    onScore(localScore)
  }, [])

  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      <div className="relative h-12">
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={localScore}
          onChange={(e) => {
            const newScore = parseInt(e.target.value)
            setLocalScore(newScore)
            onScore(newScore)
          }}
          className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-[#664ec9]/20 rounded-full appearance-none cursor-pointer 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-6 
            [&::-webkit-slider-thumb]:h-6 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-[#664ec9] 
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:duration-150 
            [&::-webkit-slider-thumb]:hover:scale-125
            [&::-webkit-slider-thumb]:active:scale-110"
        />
      </div>
      <div className="absolute top-full pt-3 left-0 right-0 flex justify-between text-sm text-gray-500">
        {[...Array(11)].map((_, i) => (
          <span key={i} className={`transition-all duration-150 ${
            i === localScore ? 'text-[#664ec9] font-medium scale-110' : ''
          }`}>
            {i}
          </span>
        ))}
      </div>
    </div>
  )
}

// Add new component for the Life Wheel visualization
const LifeWheelVisualization = ({ scores }: { scores: Record<string, number> }) => {
  const categories = Object.keys(scores)
  const numCategories = categories.length
  const angleStep = (2 * Math.PI) / numCategories

  // Generate points for the spider web
  const getPoints = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2 // Start from top
    const radius = (value / 10) * 150 // Scale to SVG size
    return {
      x: 200 + radius * Math.cos(angle),
      y: 200 + radius * Math.sin(angle)
    }
  }

  return (
    <div className="relative w-[704px] h-[572px]">
      <svg width="100%" height="100%" viewBox="0 0 704 572">
        {/* Background circles */}
        {[...Array(10)].map((_, i) => (
          <polygon
            key={i}
            points={categories.map((_, j) => {
              const point = getPoints((i + 1), j)
              return `${point.x},${point.y}`
            }).join(' ')}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        ))}

        {/* Score areas */}
        <polygon
          points={categories.map((category, i) => {
            const point = getPoints(scores[category], i)
            return `${point.x},${point.y}`
          }).join(' ')}
          fill="rgba(255, 46, 0, 0.25)"
          stroke="#FF4D00"
          strokeWidth="2"
        />

        {/* Ideal life area */}
        <polygon
          points={categories.map((category, i) => {
            const point = getPoints(10, i)
            return `${point.x},${point.y}`
          }).join(' ')}
          fill="rgba(57, 255, 229, 0.25)"
          stroke="#39FFE5"
          strokeWidth="2"
        />

        {/* Category labels */}
        {categories.map((category, i) => {
          const point = getPoints(11, i)
          const color = categoryColors[category as keyof typeof categoryColors]
          return (
            <foreignObject
              key={category}
              x={point.x - 60}
              y={point.y - 20}
              width="120"
              height="40"
            >
              <div 
                className="px-3 py-2 rounded text-center text-sm font-medium text-gray-800"
                style={{ 
                  backgroundColor: color,
                  color: getContrastColor(color)
                }}
              >
                {category}
              </div>
            </foreignObject>
          )
        })}

        {/* Scale numbers */}
        {[...Array(10)].map((_, i) => (
          <text
            key={i}
            x="200"
            y={200 - (i + 1) * 15}
            className="text-xs fill-[#664EC9]"
            textAnchor="middle"
          >
            {i + 1}
          </text>
        ))}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-0 right-0 flex items-center gap-6 bg-white rounded-2xl px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#39FFE5]" />
          <span className="text-sm">Ideal life</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#FF4D00]" />
          <span className="text-sm">Current focus</span>
        </div>
      </div>
    </div>
  )
}

// Update the step titles with gaming themes
const getStepTitle = (step: number) => {
  switch (step) {
    case 1:
      return "Create Your Character";
    case 2:
      return "Select Your Starting Quest";
    case 3:
      return "Choose Your Character Class";
    case 4:
      return "Check Your Status Effects";
    case 5:
      return "Rate Your Character Stats";
    default:
      return "";
  }
}

// Update the step descriptions
const getStepDescription = (step: number) => {
  switch (step) {
    case 1:
      return "Begin your hero's journey";
    case 2:
      return "Select the quests that brought you here";
    case 3:
      return "Choose your preferred character development path";
    case 4:
      return "How are your current status effects?";
    case 5:
      return "Rate your progress in each stat category";
    default:
      return "";
  }
}

// Update the StatisticCard component to match the second screenshot exactly
const StatisticCard = ({ statistic }: { statistic: { percentage: string; fact: string } }) => {
  return (
    <div className="bg-transparent py-8">
      <div className="flex flex-col items-start text-left space-y-8">
        <motion.h2 
          className="text-[2.75rem] leading-tight font-normal text-gray-900 italic font-serif"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          You're not alone
        </motion.h2>
        
        <motion.div 
          className="text-[6rem] font-bold text-[#664ec9] leading-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {statistic.percentage}
        </motion.div>
        
        <motion.p 
          className="text-2xl text-gray-800 max-w-md mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          of players {statistic.fact}
        </motion.p>
      </div>
    </div>
  );
};

export default function AssessmentFlow() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    feelings: [] as string[],
    emotions: {
      Energy: 0,
      Stress: 0,
      Appetite: 0
    },
    goals: [] as string[],
    scores: {} as Record<string, number>
  })
  const [nameError, setNameError] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showStatistic, setShowStatistic] = useState(false)
  const [localScore, setLocalScore] = useState<number>(5)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Add function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const validateName = (name: string) => {
    if (!name.trim()) {
      setNameError("Please enter your name")
      return false
    }
    if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters")
      return false
    }
    if (!/^[a-zA-Z\s]*$/.test(name)) {
      setNameError("Name can only contain letters and spaces")
      return false
    }
    setNameError("")
    return true
  }

  const handleNameSubmit = () => {
    if (validateName(formData.name)) {
      setStep(prev => prev + 1)
    }
  }

  // Modify nextStep function to fix the type error
  const nextStep = () => {
    scrollToTop()
    setStep(prevStep => {
      const newStep = prevStep + 1
      // Reset statistic view when moving to step 5
      if (newStep === 5) {
        setShowStatistic(false)
        setCurrentQuestionIndex(0)
      }
      return newStep
    })
  }

  // Completely rewrite the handleLifeWheelScore function
  const handleLifeWheelScore = (score: number) => {
    console.log(`Scoring question ${currentQuestionIndex} with score ${score}`);
    
    // Update the scores state
    setFormData(prev => ({
      ...prev,
      scores: {
        ...prev.scores,
        [lifeWheelQuestions[currentQuestionIndex].category]: score
      }
    }));
    
    // Show statistics for low scores
    if (score <= 5) {
      setShowStatistic(true);
    } else {
      // Move to next question or results if score is high
      if (currentQuestionIndex === lifeWheelQuestions.length - 1) {
        scrollToTop();
        setStep(6); // Move to results
      } else {
        scrollToTop();
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }
  };

  // Modify the statistic card's button handler
  const handleStatisticContinue = () => {
    scrollToTop();
    setShowStatistic(false);
    
    // Check if we've completed all questions
    if (currentQuestionIndex === lifeWheelQuestions.length - 1) {
      setStep(6); // Move to results
    } else {
      // Move to the next question
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // First, let's modify the conditional rendering for step headers
  {step >= 2 && (
      <motion.div
      key={`step-${step}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Only show these headers for steps 2, 3, and 4 - NOT for step 5 */}
      {step < 5 && (
        <div className={`space-y-4 ${step === 3 || step === 4 ? 'mb-8' : 'mb-16'}`}>
          <h2 className="text-[2.75rem] leading-tight font-normal text-gray-900">
            {getStepTitle(step)}
          </h2>
          <p className="text-lg text-gray-600">
            {getStepDescription(step)}
          </p>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 mb-8">
          {feelings.map((feeling) => (
            <motion.div
              key={feeling}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                const newFeelings = formData.feelings.includes(feeling)
                  ? formData.feelings.filter(f => f !== feeling)
                  : [...formData.feelings, feeling]
                setFormData({ ...formData, feelings: newFeelings })
              }}
            >
              <div 
                className={`
                  p-6 cursor-pointer transition-all rounded-2xl
                  ${formData.feelings.includes(feeling)
                    ? "bg-[#664ec9] text-white"
                    : "bg-white hover:bg-white/90"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-normal">{feeling}</span>
                  {formData.feelings.includes(feeling) && (
                    <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="pt-8">
            <Button
              onClick={nextStep}
              className="w-full bg-[#664ec9] hover:bg-[#5B3FFF] text-white rounded-full py-6 text-lg font-normal mt-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Continue →
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <>
          <div className="grid grid-cols-2 gap-4">
            {lifeGoals.map((goal) => (
              <motion.div
                key={goal.title}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const newGoals = formData.goals.includes(goal.title)
                    ? formData.goals.filter(g => g !== goal.title)
                    : [...formData.goals, goal.title]
                  setFormData({ ...formData, goals: newGoals })
                }}
              >
                <div className={`
                  p-4 cursor-pointer transition-all rounded-2xl h-full
                  ${formData.goals.includes(goal.title)
                    ? "bg-[#664ec9] text-white"
                    : "bg-white hover:bg-white/90"
                  }
                `}>
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`w-14 h-14 flex items-center justify-center ${
                      formData.goals.includes(goal.title)
                        ? "text-white"
                        : "text-[#664ec9]"
                    }`}>
                      {goal.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{goal.title}</h3>
                      <p className={`text-sm leading-relaxed ${
                        formData.goals.includes(goal.title)
                          ? "text-white/90"
                          : "text-gray-600"
                      }`}>
                        {goal.description}
                      </p>
                    </div>
                    {formData.goals.includes(goal.title) && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="pt-16">
            <Button
              onClick={nextStep}
              className="w-full bg-[#664ec9] hover:bg-[#5B3FFF] text-white rounded-full py-6 text-lg font-normal mt-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Continue →
            </Button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <div className="space-y-12">
            {emotions.map((emotion) => (
              <div key={emotion.name} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center text-[#664ec9]">
                    {emotion.icon}
                  </div>
                  <span className="text-2xl font-medium text-gray-900">{emotion.name}</span>
                </div>

                <div className="relative w-full max-w-[600px] mx-auto">
                  <div className="relative h-12">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      value={Math.round(formData.emotions[emotion.name as keyof typeof formData.emotions] / 10)}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          emotions: {
                            ...formData.emotions,
                            [emotion.name]: parseInt(e.target.value) * 10
                          }
                        })
                      }}
                      className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-[#664ec9]/20 rounded-full appearance-none cursor-pointer 
                        [&::-webkit-slider-thumb]:appearance-none 
                        [&::-webkit-slider-thumb]:w-6 
                        [&::-webkit-slider-thumb]:h-6 
                        [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:bg-[#664ec9] 
                        [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:transition-transform
                        [&::-webkit-slider-thumb]:duration-150 
                        [&::-webkit-slider-thumb]:hover:scale-125
                        [&::-webkit-slider-thumb]:active:scale-110
                        [&::-webkit-slider-thumb]:shadow-md"
                    />
                  </div>
                  <div className="absolute top-full pt-3 left-0 right-0 flex justify-between text-sm font-medium">
                    {[...Array(11)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`transition-all duration-150 ${
                          i === Math.round(formData.emotions[emotion.name as keyof typeof formData.emotions] / 10) 
                            ? 'text-[#664ec9] font-semibold scale-110' 
                            : 'text-gray-600'
                        }`}
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-16">
            <Button
              onClick={nextStep}
              className="w-full bg-[#664ec9] hover:bg-[#5B3FFF] text-white rounded-full py-6 text-lg font-normal mt-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Continue →
            </Button>
          </div>
        </>
      )}

      {/* Now completely replace the step 5 section */}
      {step === 5 && (
        <div className="max-w-[600px] mx-auto">
          {!showStatistic ? (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8 pb-24"
            >
              {/* Progress indicator at the top */}
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 bg-[#664ec9]/10 rounded-full text-[#664ec9] font-medium">
                  Question {currentQuestionIndex + 1} of {lifeWheelQuestions.length}
                </span>
                <span className="text-sm text-gray-500">
                  • {lifeWheelQuestions[currentQuestionIndex].category}
                </span>
              </div>
              {/* Step title and description */}
              <motion.div 
                className="space-y-4 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-[2.75rem] leading-tight font-normal text-gray-900">
                  {getStepTitle(step)}
                </h2>
                <p className="text-lg text-gray-600">
                  {getStepDescription(step)}
                </p>
              </motion.div>
              
              {/* Question content */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-4">
                  <motion.h3 
                    className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {lifeWheelQuestions[currentQuestionIndex].question}
                  </motion.h3>
                  <motion.p 
                    className="text-lg text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {lifeWheelQuestions[currentQuestionIndex].description}
                  </motion.p>
                </div>
                
                <div className="grid grid-cols-1 gap-4 mt-8">
                  <motion.div 
                    className="bg-red-50/50 p-6 rounded-xl border border-red-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <p className="text-sm font-medium text-red-600 mb-2">NPC State (0)</p>
                    <p className="text-base text-gray-800">{lifeWheelQuestions[currentQuestionIndex].npcState}</p>
                  </motion.div>
                  <motion.div 
                    className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <p className="text-sm font-medium text-emerald-600 mb-2">Hero State (10)</p>
                    <p className="text-base text-gray-800">{lifeWheelQuestions[currentQuestionIndex].heroState}</p>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Slider */}
              <motion.div 
                className="relative w-full max-w-[600px] mx-auto pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="relative h-12">
                  <div className="absolute -top-6 left-0 right-0 flex justify-between">
                    <span className="text-sm font-medium text-red-500">NPC</span>
                    <span className="text-sm font-medium text-emerald-500">HERO</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={localScore}
                    onChange={(e) => {
                      const newScore = parseInt(e.target.value);
                      setLocalScore(newScore);
                    }}
                    className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gradient-to-r from-red-300 to-emerald-300 rounded-full appearance-none cursor-pointer 
                      [&::-webkit-slider-thumb]:appearance-none 
                      [&::-webkit-slider-thumb]:w-8 
                      [&::-webkit-slider-thumb]:h-8 
                      [&::-webkit-slider-thumb]:rounded-full 
                      [&::-webkit-slider-thumb]:bg-[#664ec9] 
                      [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-webkit-slider-thumb]:transition-transform
                      [&::-webkit-slider-thumb]:duration-150 
                      [&::-webkit-slider-thumb]:hover:scale-125
                      [&::-webkit-slider-thumb]:active:scale-110
                      [&::-webkit-slider-thumb]:shadow-lg"
      />
    </div>
                <div className="absolute top-full pt-3 left-0 right-0 flex justify-between text-sm text-gray-500">
                  {[...Array(11)].map((_, i) => (
                    <motion.span 
                      key={i} 
                      className={`transition-all duration-150 ${
                        i === localScore ? 'text-[#664ec9] font-medium scale-110' : ''
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 + i * 0.03 }}
                    >
                      {i}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
              
              {/* Submit button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="pt-12"
              >
                <Button
                  onClick={() => handleLifeWheelScore(localScore)}
                  className="w-full bg-[#664ec9] hover:bg-[#5B3FFF] text-white rounded-full py-5 text-lg font-normal mt-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1 }}
                    className="flex items-center justify-center"
                  >
                    Submit Score
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="statistic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pb-24"
            >
              {/* Remove the duplicate progress bar */}
              
              <StatisticCard 
                statistic={lifeWheelQuestions[currentQuestionIndex].statistic} 
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-8"
              >
                <Button
                  onClick={handleStatisticContinue}
                  className="w-full bg-[#664ec9] hover:bg-[#5B3FFF] text-white rounded-full py-6 text-lg font-normal shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  Continue →
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  )}

  // Add this function to handle opening the waitlist form
  const handleOpenWaitlist = () => {
    setIsModalOpen(true);
  };

  // Add back button handler
  const handleBack = () => {
    if (step === 5 && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowStatistic(false);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  // Remove the URL routing logic and directly show results
  if (step === 6) {
    return (
      <div>
        <AssessmentResult 
          name={formData.name}
          scores={formData.scores}
          onSchedule={() => setIsModalOpen(true)}
        />
        {isModalOpen && (
          <WaitlistForm 
            onClose={() => setIsModalOpen(false)}
            selectedTier="Professional Growth"
            assessmentResults={{
              personalityType: determinePersonalityType(formData.scores),
              strengths: determineStrengths(formData.scores),
              challenges: determineChallenges(formData.scores),
              recommendedPath: determineRecommendedPath(formData.scores),
              scores: formData.scores,
              completedAt: new Date().toISOString()
            }}
          />
        )}
    </div>
  )
  }

  return (
    <div className="min-h-screen bg-[#ede6dc] font-geist-sans">
      {/* Main container */}
      <div className="max-w-[1000px] mx-auto px-4">
        {/* Progress bar section - removed fixed positioning */}
        <div className="bg-[#ede6dc] pt-[80px]">
          <div className="max-w-[720px] mx-auto">
            {/* Progress bar */}
            {step !== 6 && (
              <div className="pt-8 pb-8">
                <div className="h-2 bg-gray-200 rounded-full">
                  <motion.div
                    className="h-full bg-[#664ec9] rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(step / 6) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-[720px] mx-auto">
          {/* Logo */}
          <div className="mb-16">
            <Image
              src="/images/logo.png"
              alt="Onion Logo"
              width={201}
              height={54}
              className="w-[201px] h-[54.46px]"
              priority
            />
          </div>

          {/* Back button for steps 1-5 (not on step 0) */}
          {step > 0 && step < 6 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-700 hover:text-[#664ec9] mb-8 font-medium text-lg focus:outline-none"
              style={{ background: 'none', border: 'none', padding: 0 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}

          {/* Content */}
          {step !== 6 ? (
            <div className="w-full">
              <AnimatePresence mode="wait">
                {/* Landing Page */}
                {step === 0 && (
                  <motion.div
                    key="landing"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                          <h1 className="text-[56px] leading-[1.1] font-normal text-gray-900 mb-4">
                        Life Wheel Assessment
                      </h1>
                          <p className="text-[40px] italic font-serif text-gray-900 mb-8">
                        A Self-Reflection Tool
                      </p>
                          <p className="text-lg leading-[1.6] text-gray-700 mb-16 font-serif">
                        The Life Wheel is a powerful self-reflection tool designed to help you evaluate
                        key areas of your life and identify areas for growth and balance. By rating your
                        satisfaction in different aspects—such as career, health, relationships, and
                        personal growth—you can gain clarity on where you're thriving and where
                        adjustments may be needed. This questionnaire will guide you through an
                        honest evaluation of your current state, helping you create a roadmap for a
                        more fulfilling and balanced life.
                      </p>
                          <div className="flex justify-center">
                            <Button
                              onClick={nextStep}
                              className="w-full max-w-[600px] bg-[#664ec9] hover:bg-[#5B3FFF] text-white rounded-full py-6 text-lg font-normal"
                            >
                              Get started →
                            </Button>
                  </div>
                </motion.div>
                )}

                {/* Name Input */}
                {step === 1 && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                        >
                          <p className="text-sm uppercase tracking-wider text-gray-500">Getting started</p>
                          <h2 className="text-[2.75rem] leading-tight font-normal text-gray-900 mb-8">
                            Tell us a little about yourself
                          </h2>
                          <div className="flex items-center gap-4 mb-16">
                            <span className="text-2xl">My name is</span>
                    <input
                      type="text"
                      value={formData.name}
                          onChange={(e) => {
                            setNameError("")
                            setFormData({ ...formData, name: e.target.value })
                          }}
                          className="flex-1 border-b-2 border-gray-300 focus:border-[#664ec9] bg-transparent text-2xl outline-none px-2 py-1"
                      placeholder="Enter your name"
                    />
                  </div>
                          {nameError && (
                            <p className="text-red-500 mb-4">{nameError}</p>
                          )}
                          <div className="flex justify-center">
                            <Button
                              onClick={handleNameSubmit}
                              className="w-full max-w-[600px] bg-[#664ec9] hover:bg-[#5B3FFF] text-white rounded-full py-6 text-lg font-normal"
                            >
                              Continue →
                            </Button>
                  </div>
                </motion.div>
                )}

                {/* Step 2 - Feelings Selection */}
                {step === 2 && (
                  <motion.div
                          key="step-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                          className="pb-24"
                        >
                          <div className="space-y-4 mb-8">
                            <h2 className="text-[2.75rem] leading-tight font-normal text-gray-900">
                              {getStepTitle(step)}
                            </h2>
                            <p className="text-lg text-gray-600">
                              {getStepDescription(step)}
                            </p>
                      </div>
                          
                          <div className="space-y-4 mb-16">
                    {feelings.map((feeling) => (
                      <motion.div
                        key={feeling}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        onClick={() => {
                          const newFeelings = formData.feelings.includes(feeling)
                            ? formData.feelings.filter(f => f !== feeling)
                            : [...formData.feelings, feeling]
                          setFormData({ ...formData, feelings: newFeelings })
                        }}
                      >
                            <div 
                              className={`
                              p-6 cursor-pointer transition-all rounded-2xl
                              ${formData.feelings.includes(feeling)
                            ? "bg-[#664ec9] text-white"
                            : "bg-white hover:bg-white/90"
                              }
                            `}
                            >
                          <div className="flex items-center justify-between">
                                <span className="text-xl font-normal">{feeling}</span>
                            {formData.feelings.includes(feeling) && (
                                  <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                          
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                          >
                            <Button
                              onClick={nextStep}
                              className="w-full bg-[#664ec9] hover:bg-[#5B3FFF] text-white rounded-full py-6 text-lg font-normal shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                              Continue →
                            </Button>
                          </motion.div>
                </motion.div>
                )}

                {/* Step 3 - Life Goals */}
                {step === 3 && (
                  <motion.div
                          key="step-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                          className="pb-24"
                        >
                          <div className="space-y-4 mb-8">
                            <h2 className="text-[2.75rem] leading-tight font-normal text-gray-900">
                              {getStepTitle(step)}
                            </h2>
                            <p className="text-lg text-gray-600">
                              {getStepDescription(step)}
                            </p>
                      </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-16">
                            {lifeGoals.map((goal) => (
                              <motion.div
                                key={goal.title}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                  const newGoals = formData.goals.includes(goal.title)
                                    ? formData.goals.filter(g => g !== goal.title)
                                    : [...formData.goals, goal.title]
                                  setFormData({ ...formData, goals: newGoals })
                                }}
                              >
                                <div className={`
                                  p-4 cursor-pointer transition-all rounded-2xl h-full
                                  ${formData.goals.includes(goal.title)
                                    ? "bg-[#664ec9] text-white"
                                    : "bg-white hover:bg-white/90"
                                  }
                                `}>
                                  <div className="flex flex-col items-center text-center space-y-3">
                                    <div className={`w-14 h-14 flex items-center justify-center ${
                                      formData.goals.includes(goal.title)
                                        ? "text-white"
                                        : "text-[#664ec9]"
                                    }`}>
                                      {goal.icon}
                                    </div>
                                    <div>
                                      <h3 className="text-xl font-semibold mb-1">{goal.title}</h3>
                                      <p className={`text-sm leading-relaxed ${
                                        formData.goals.includes(goal.title)
                                          ? "text-white/90"
                                          : "text-gray-600"
                                      }`}>
                                        {goal.description}
                                      </p>
                                    </div>
                                    {formData.goals.includes(goal.title) && (
                                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                          
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                          >
                            <Button
                              onClick={nextStep}
                              className="w-full bg-[#664ec9] hover:bg-[#5B3FFF] text-white rounded-full py-6 text-lg font-normal shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                              Continue →
                            </Button>
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Step 4 - Emotions */}
                      {step === 4 && (
                        <motion.div
                          key="step-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="pb-24"
                        >
                          <div className="space-y-4 mb-8">
                            <h2 className="text-[2.75rem] leading-tight font-normal text-gray-900">
                              {getStepTitle(step)}
                            </h2>
                            <p className="text-lg text-gray-600">
                              {getStepDescription(step)}
                            </p>
                        </div>
                            
                        <div className="space-y-12 mb-16">
                      {emotions.map((emotion) => (
                        <div key={emotion.name} className="space-y-6">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 flex items-center justify-center text-[#664ec9]">
                                  {emotion.icon}
                      </div>
                                <span className="text-2xl font-medium text-gray-900">{emotion.name}</span>
                              </div>

                              <div className="relative w-full max-w-[600px] mx-auto">
                                <div className="relative h-12">
                              <input
                                type="range"
                                min="0"
                                    max="10"
                                    step="1"
                                    value={Math.round(formData.emotions[emotion.name as keyof typeof formData.emotions] / 10)}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  emotions: {
                                    ...formData.emotions,
                                          [emotion.name]: parseInt(e.target.value) * 10
                                  }
                                })
                              }}
                                    className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-[#664ec9]/20 rounded-full appearance-none cursor-pointer 
                                      [&::-webkit-slider-thumb]:appearance-none 
                                      [&::-webkit-slider-thumb]:w-6 
                                      [&::-webkit-slider-thumb]:h-6 
                                      [&::-webkit-slider-thumb]:rounded-full 
                                      [&::-webkit-slider-thumb]:bg-[#664ec9] 
                                      [&::-webkit-slider-thumb]:cursor-pointer
                                      [&::-webkit-slider-thumb]:transition-transform
                                      [&::-webkit-slider-thumb]:duration-150 
                                      [&::-webkit-slider-thumb]:hover:scale-125
                                      [&::-webkit-slider-thumb]:active:scale-110
                                      [&::-webkit-slider-thumb]:shadow-md"
                              />
                            </div>
                            <div className="absolute top-full pt-3 left-0 right-0 flex justify-between text-sm font-medium">
                              {[...Array(11)].map((_, i) => (
                                <span 
                                  key={i} 
                                  className={`transition-all duration-150 ${
                                    i === Math.round(formData.emotions[emotion.name as keyof typeof formData.emotions] / 10) 
                                      ? 'text-[#664ec9] font-semibold scale-110' 
                                      : 'text-gray-600'
                                  }`}
                                >
                                  {i}
                                </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                            
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          <Button
                            onClick={nextStep}
                            className="w-full bg-[#664ec9] hover:bg-[#5B3FFF] text-white rounded-full py-6 text-lg font-normal shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                          >
                            Continue →
                          </Button>
                        </motion.div>
                </motion.div>
              )}

              {/* Step 5 - Life Wheel Questions */}
              {step === 5 && (
                <div className="max-w-[600px] mx-auto">
                  {!showStatistic ? (
            <motion.div
                        key="question"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-8 pb-24"
                      >
                        {/* Progress indicator at the top */}
                        <div className="flex items-center gap-2 mb-6">
                          <span className="px-3 py-1 bg-[#664ec9]/10 rounded-full text-[#664ec9] font-medium">
                            Question {currentQuestionIndex + 1} of {lifeWheelQuestions.length}
                          </span>
                          <span className="text-sm text-gray-500">
                            • {lifeWheelQuestions[currentQuestionIndex].category}
                          </span>
                        </div>
                        {/* Step title and description */}
                        <motion.div 
                          className="space-y-4 mb-8"
                          initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <h2 className="text-[2.75rem] leading-tight font-normal text-gray-900">
                            {getStepTitle(step)}
                          </h2>
                          <p className="text-lg text-gray-600">
                            {getStepDescription(step)}
                          </p>
                        </motion.div>
                        
                        {/* Question content */}
                <motion.div
                          className="space-y-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="space-y-4">
                            <motion.h3 
                              className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              {lifeWheelQuestions[currentQuestionIndex].question}
                            </motion.h3>
                            <motion.p 
                              className="text-lg text-gray-600"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                            >
                              {lifeWheelQuestions[currentQuestionIndex].description}
                            </motion.p>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-4 mt-8">
                            <motion.div 
                              className="bg-red-50/50 p-6 rounded-xl border border-red-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: 0.4 }}
                            >
                              <p className="text-sm font-medium text-red-600 mb-2">NPC State (0)</p>
                              <p className="text-base text-gray-800">{lifeWheelQuestions[currentQuestionIndex].npcState}</p>
                </motion.div>
                            <motion.div 
                              className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: 0.5 }}
                            >
                              <p className="text-sm font-medium text-emerald-600 mb-2">Hero State (10)</p>
                              <p className="text-base text-gray-800">{lifeWheelQuestions[currentQuestionIndex].heroState}</p>
                            </motion.div>
              </div>
            </motion.div>

                        {/* Slider */}
        <motion.div
                          className="relative w-full max-w-[600px] mx-auto pt-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          <div className="relative h-12">
                            <div className="absolute -top-6 left-0 right-0 flex justify-between">
                              <span className="text-sm font-medium text-red-500">NPC</span>
                              <span className="text-sm font-medium text-emerald-500">HERO</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="10"
                              step="1"
                              value={localScore}
                              onChange={(e) => {
                                const newScore = parseInt(e.target.value);
                                setLocalScore(newScore);
                              }}
                              className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gradient-to-r from-red-300 to-emerald-300 rounded-full appearance-none cursor-pointer 
                                [&::-webkit-slider-thumb]:appearance-none 
                                [&::-webkit-slider-thumb]:w-8 
                                [&::-webkit-slider-thumb]:h-8 
                                [&::-webkit-slider-thumb]:rounded-full 
                                [&::-webkit-slider-thumb]:bg-[#664ec9] 
                                [&::-webkit-slider-thumb]:cursor-pointer
                                [&::-webkit-slider-thumb]:transition-transform
                                [&::-webkit-slider-thumb]:duration-150 
                                [&::-webkit-slider-thumb]:hover:scale-125
                                [&::-webkit-slider-thumb]:active:scale-110
                                [&::-webkit-slider-thumb]:shadow-lg"
                            />
                          </div>
                          <div className="absolute top-full pt-3 left-0 right-0 flex justify-between text-sm text-gray-500">
                            {[...Array(11)].map((_, i) => (
                              <motion.span 
                                key={i} 
                                className={`transition-all duration-150 ${
                                  i === localScore ? 'text-[#664ec9] font-medium scale-110' : ''
                                }`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.7 + i * 0.03 }}
                              >
                                {i}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                        
                        {/* Submit button */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                          className="pt-12"
                        >
                          <Button
                            onClick={() => handleLifeWheelScore(localScore)}
                            className="w-full bg-[#664ec9] hover:bg-[#5B3FFF] text-white rounded-full py-5 text-lg font-normal mt-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                          >
                            <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 1 }}
                              className="flex items-center justify-center"
                            >
                              Submit Score
                              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </motion.span>
                          </Button>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="statistic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pb-24"
                      >
                        {/* Remove the duplicate progress bar */}
                        
                        <StatisticCard 
                          statistic={lifeWheelQuestions[currentQuestionIndex].statistic} 
                        />
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                          className="mt-8"
        >
          <Button
                            onClick={handleStatisticContinue}
                            className="w-full bg-[#664ec9] hover:bg-[#5B3FFF] text-white rounded-full py-6 text-lg font-normal shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
                            Continue →
          </Button>
        </motion.div>
                      </motion.div>
                    )}
      </div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <AssessmentResult 
              name={formData.name}
              scores={formData.scores}
              onSchedule={() => setIsModalOpen(true)}
            />
          )}
        </div>
      </div>
      
      {isModalOpen && (
        <WaitlistForm 
          onClose={() => setIsModalOpen(false)}
          selectedTier="Professional Growth"
          assessmentResults={{
            personalityType: determinePersonalityType(formData.scores),
            strengths: determineStrengths(formData.scores),
            challenges: determineChallenges(formData.scores),
            recommendedPath: determineRecommendedPath(formData.scores),
            scores: formData.scores,
            completedAt: new Date().toISOString()
          }}
        />
      )}
    </div>
  )
}
