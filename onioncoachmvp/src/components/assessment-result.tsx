"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LifeWheelVisualization } from "@/components/life-wheel-visualization"
import { NavBar } from "@/components/nav-bar"
import { motion } from "framer-motion"
import { RecommendationsSection } from "@/components/recommendations-section"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { WaitlistForm } from "./waitlist-form"
import { useState } from "react"
import { WaitlistModal } from "./waitlist-modal"
import { categoryColors } from "@/components/assessment-flow"
import { useModal } from "@/components/ui/modal-context"

interface AssessmentResultProps {
  name: string;
  scores: Record<string, number>;
  onSchedule: () => void;
}

export function AssessmentResult({ name, scores, onSchedule }: AssessmentResultProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setModalOpen } = useModal();

  const handleOpenSchedule = () => {
    setIsModalOpen(true);
    setModalOpen(true);
    onSchedule();
  };

  const handleCloseSchedule = () => {
    setIsModalOpen(false);
    setModalOpen(false);
  };

  // Calculate the actual percentage
  const calculateOverallScore = () => {
    const categories = Object.keys(scores);
    const totalPossibleScore = categories.length * 10; // Maximum score possible
    const currentTotalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    
    // Calculate percentage and round to nearest 5%
    const exactPercentage = (currentTotalScore / totalPossibleScore) * 100;
    const roundedPercentage = Math.round(exactPercentage / 5) * 5;
    
    return roundedPercentage;
  };

  const overallScore = calculateOverallScore();

  // Update the result messages with gaming metaphors
  const getResultMessage = (score: number) => {
    if (score >= 80) return "Legendary Status";
    if (score >= 60) return "Elite Player";
    if (score >= 40) return "Seasoned Adventurer";
    return "Promising Rookie";
  }

  const getResultDescription = (score: number, name: string) => {
    return `${name}, your character stats are ${score}% aligned with your ideal build. While you've made impressive progress in your main questline, there are still some side quests and skill trees to explore. Let's optimize your character build and unlock your full potential!`;
  }

  return (
    <>
      {!isModalOpen && <NavBar />}
      {/* Responsive Results Layout */}
      <section className="w-full bg-[#664EC9] pt-8 pb-8 min-h-screen flex flex-col items-center justify-start">
        {/* Mobile Layout */}
        <div className="w-full max-w-md mx-auto flex flex-col items-start md:hidden px-4">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-[140px] h-[40px] flex items-center gap-2 mb-4 mt-16"
          >
            <Image
              src="/images/logo_white.jpeg"
              alt="Onion Logo"
              width={120}
              height={40}
              className="w-auto h-[40px]"
              priority
            />
          </motion.div>
          {/* Result Text */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-light text-white mb-2 text-left"
          >
            Hi {name}, your quiz results match your ideal life
          </motion.h2>
          {/* Score */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-[2px] h-[60px] bg-white" />
            <span className="font-geist text-[64px] leading-[110%] text-white">
              {overallScore}%
            </span>
          </motion.div>
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-poppins text-base leading-[140%] text-white mb-4 text-left"
          >
            {getResultDescription(overallScore, name)}
          </motion.p>
          {/* Button */}
          <motion.div className="mb-4 w-full flex">
            <Button
              onClick={handleOpenSchedule}
              className="flex items-center justify-between w-full max-w-xs h-[48px] bg-[#FF6512] hover:bg-[#E55401] rounded-full px-6"
            >
              <span className="text-base text-white whitespace-nowrap">
                Schedule a free coaching
              </span>
              <svg width="24" height="21" viewBox="0 0 24 21" fill="none">
                <path d="M23.0607 11.4393C23.6464 10.8536 23.6464 9.90087 23.0607 9.31505L13.5147 -0.23093C12.9289 -0.81674 11.9762 -0.81674 11.3904 -0.23093C10.8046 0.35489 10.8046 1.30762 11.3904 1.89343L19.9571 10.4601L11.3904 19.0268C10.8046 19.6126 10.8046 20.5653 11.3904 21.1511C11.9762 21.737 12.9289 21.737 13.5147 21.1511L23.0607 11.6052L23.0607 11.4393ZM0 11.8345L22 11.8345V8.91495L0 8.91495L0 11.8345Z" fill="white"/>
              </svg>
            </Button>
          </motion.div>
          {/* Radar Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="w-full flex flex-col items-center mb-2"
          >
            <div className="w-[95vw] max-w-md h-[80vw] max-h-[400px] mx-auto">
              <LifeWheelVisualization scores={scores} />
            </div>
          </motion.div>
          <div className="flex md:hidden flex-row items-center justify-center bg-white rounded-full px-4 py-2 shadow-lg mt-4 w-full max-w-xs mx-auto mb-4 gap-4">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-cyan-200 border-2 border-white"></span>
              <span className="text-xs text-gray-800 font-medium">Ideal life</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-orange-400 border-2 border-white"></span>
              <span className="text-xs text-gray-800 font-medium">Current focus</span>
            </div>
          </div>
        </div>
        {/* Desktop Layout (unchanged) */}
        <div className="hidden md:block w-full">
          <div className="max-w-[1442px] h-[750px] mx-auto relative">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute w-[201px] h-[54.46px] left-[60px] top-[60px] flex items-center gap-[6px]"
          >
            <Image
              src="/images/logo_white.jpeg"
              alt="Onion Logo"
              width={160}
              height={54}
              className="w-auto h-[54.46px]"
              priority
            />
          </motion.div>
          {/* Two-column Grid Layout */}
            <div className="grid grid-cols-2 h-full pt-[120px]">
            {/* Left Column - Results Content */}
              <div className="pl-[50px]">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                  className="text-2xl font-light text-white mb-[20px]"
              >
                Hi {name}, your quiz results match your ideal life
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start gap-[16px] mb-[64px]"
              >
                <div className="w-[1px] h-[135px] bg-white" />
                <span className="font-geist text-[140px] leading-[110%] text-white">
                  {overallScore}%
                </span>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="font-poppins text-[18px] leading-[140%] text-white mb-[64px] w-[539px]"
              >
                {getResultDescription(overallScore, name)}
              </motion.p>
              <motion.div>
                <Button
                  onClick={handleOpenSchedule}
                  className="flex items-center justify-between w-[320px] h-[57px] bg-[#FF6512] hover:bg-[#E55401] rounded-full px-8"
                >
                  <span className="text-[18px] text-white whitespace-nowrap">
                    Schedule your free coaching
                  </span>
                  <svg width="24" height="21" viewBox="0 0 24 21" fill="none">
                    <path d="M23.0607 11.4393C23.6464 10.8536 23.6464 9.90087 23.0607 9.31505L13.5147 -0.23093C12.9289 -0.81674 11.9762 -0.81674 11.3904 -0.23093C10.8046 0.35489 10.8046 1.30762 11.3904 1.89343L19.9571 10.4601L11.3904 19.0268C10.8046 19.6126 10.8046 20.5653 11.3904 21.1511C11.9762 21.737 12.9289 21.737 13.5147 21.1511L23.0607 11.6052L23.0607 11.4393ZM0 11.8345L22 11.8345V8.91495L0 8.91495L0 11.8345Z" fill="white"/>
                  </svg>
                </Button>
              </motion.div>
            </div>
            {/* Right Column - Life Wheel Chart */}
            <div className="relative">
              <motion.div 
                  initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                  className="absolute left-[-20px] top-[-80px] w-[600px] h-[650px]"
              >
                <LifeWheelVisualization scores={scores} />
              </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations Layout */}
      <RecommendationsSection scores={scores} />

      {/* Schedule Modal (WaitlistModal or WaitlistForm) */}
      {isModalOpen && (
        <WaitlistModal isOpen={isModalOpen} onClose={handleCloseSchedule} />
      )}
    </>
  )
}

// Helper functions
function formatCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    "Family": "Family Relationships",
    "Friends": "Social Connections",
    "Romantic Life": "Romantic Relationships",
    "Work": "Career Development",
    "Business": "Business Growth",
    "Money": "Financial Management",
    "Personal Growth": "Personal Development",
    "Health and Fitness": "Health & Wellness"
  };
  return categoryMap[category] || category;
}

export function determineStrengths(scores: Record<string, number>): string[] {
  return Object.entries(scores)
    .filter(([_, score]) => score >= 7)
    .map(([category]) => formatCategory(category));
}

export function determineChallenges(scores: Record<string, number>): string[] {
  return Object.entries(scores)
    .filter(([_, score]) => score <= 5)
    .map(([category]) => formatCategory(category));
}

export function determineRecommendedPath(scores: Record<string, number>): string {
  const workScore = scores["Work"] || 0;
  const businessScore = scores["Business"] || 0;
  const personalGrowthScore = scores["Personal Growth"] || 0;
  const healthScore = scores["Health and Fitness"] || 0;
  const familyScore = scores["Family"] || 0;
  const moneyScore = scores["Money"] || 0;

  const avgScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length;
  const highestScore = Math.max(...Object.values(scores));
  const lowestScore = Math.min(...Object.values(scores));

  // Career paths
  if (workScore >= 7 && businessScore >= 6 && moneyScore >= 5) {
    if (personalGrowthScore >= 6)
      return "Legendary Leadership Quest";
    return "Elite Commander Path";
  }

  // Business paths
  if (businessScore >= 7 && (workScore >= 6 || moneyScore >= 6)) {
    if (personalGrowthScore >= 6)
      return "Master Strategist Saga";
    return "Empire Builder Quest";
  }

  // Balance paths
  if ((workScore >= 7 || businessScore >= 7) && 
      (healthScore >= 6 || familyScore >= 6)) {
    if (personalGrowthScore >= 6)
      return "Harmonious Hero Journey";
    return "Life Balance Adventure";
  }

  // Recovery paths
  if (avgScore <= 5) {
    if (lowestScore <= 3)
      return "New Player Tutorial";
    return "Character Foundation Quest";
  }

  // Balance improvement
  if (highestScore - lowestScore >= 5) {
    return "Stat Balance Mission";
  }

  return "Epic Life Quest";
}

export function determinePersonalityType(scores: Record<string, number>): string {
  const avgScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length;
  const workScore = scores["Work"] || 0;
  const personalGrowthScore = scores["Personal Growth"] || 0;
  const healthScore = scores["Health and Fitness"] || 0;
  const moneyScore = scores["Money"] || 0;

  if (avgScore >= 7.5) return "Legendary Hero";
  if (avgScore >= 6.5 && workScore >= 7) return "Elite Warrior";
  if (avgScore >= 6 && personalGrowthScore >= 6) return "Mystic Sage";
  if (avgScore >= 5.5 && healthScore >= 6) return "Resilient Adventurer";
  if (avgScore >= 5 && moneyScore >= 6) return "Master Merchant";
  return "Aspiring Adventurer";
}

function getContrastColor(hexColor: string): string {
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