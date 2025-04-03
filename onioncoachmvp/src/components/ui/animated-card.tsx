"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Card } from "./card"

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number
}

export function AnimatedCard({ children, className, delay = 0, ...props }: AnimatedCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
      }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [delay])

  return (
    <Card
      ref={cardRef}
      className={cn(
        "transform transition-all duration-700 opacity-0 translate-y-8",
        isVisible && "opacity-100 translate-y-0",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  )
} 