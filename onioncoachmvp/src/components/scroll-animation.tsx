"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect } from "react"

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

  useEffect(() => {
    let animationFrame: number;
    let lastTimestamp: number | null = null;
    let direction: 1 | -1 = 1; // 1 for down, -1 for up
    const speed = 60; // pixels per second, adjust for faster/slower scroll

    function animateScroll(timestamp: number) {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const delta = (timestamp - lastTimestamp) / 1000; // seconds
        lastTimestamp = timestamp;

        if (ref.current) {
            const grid = ref.current;
            const maxScroll = grid.scrollHeight - grid.clientHeight;
            if (maxScroll > 0) {
                grid.scrollTop += direction * speed * delta;
                if (grid.scrollTop >= maxScroll) {
                    grid.scrollTop = maxScroll;
                    direction = -1; // reverse to up
                } else if (grid.scrollTop <= 0) {
                    grid.scrollTop = 0;
                    direction = 1; // reverse to down
                }
            }
        }
        animationFrame = requestAnimationFrame(animateScroll);
    }
    animationFrame = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

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