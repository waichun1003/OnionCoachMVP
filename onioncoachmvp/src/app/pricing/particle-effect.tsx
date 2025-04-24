"use client"

import { motion } from "framer-motion"

export default function ParticleEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#E86C3A]/20 rounded-full"
          initial={{ 
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            scale: 0 
          }}
          animate={{ 
            x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
            y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
            scale: [0, 1, 0]
          }}
          transition={{ 
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
} 