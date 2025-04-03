"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface ScrollAnimationProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
}

export function ScrollAnimation({ 
  children, 
  direction = "up", 
  delay = 0 
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"]
  })

  const getDirectionOffset = () => {
    switch (direction) {
      case "up": return [50, 0]
      case "down": return [-50, 0]
      case "left": return [50, 0]
      case "right": return [-50, 0]
      default: return [0, 0]
    }
  }

  const y = useTransform(scrollYProgress, [0, 1], getDirectionOffset())
  const x = useTransform(scrollYProgress, [0, 1], 
    direction === "left" || direction === "right" ? getDirectionOffset() : [0, 0]
  )
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        x: direction === "left" || direction === "right" ? x : 0,
        y: direction === "up" || direction === "down" ? y : 0,
      }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  )
} 