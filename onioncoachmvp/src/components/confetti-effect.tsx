"use client"

import { motion } from "framer-motion"

export function ConfettiEffect() {
    // Create 50 pieces of confetti
    const confetti = [...Array(50)].map((_, i) => ({
        id: i,
        x: Math.random() * 100 - 50, // Random starting position
        y: Math.random() * -50, // Start above the container
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        color: ['#FFD700', '#FF69B4', '#4169E1', '#32CD32', '#FF4500'][Math.floor(Math.random() * 5)]
    }))

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {confetti.map(({ id, x, y, rotation, scale, color }) => (
                <motion.div
                    key={id}
                    className="absolute w-2 h-2"
                    initial={{
                        x: `${x}%`,
                        y: `${y}%`,
                        scale: 0,
                        rotate: 0
                    }}
                    animate={{
                        x: `${x + (Math.random() * 200 - 100)}%`,
                        y: '100%',
                        scale: scale,
                        rotate: rotation
                    }}
                    transition={{
                        duration: Math.random() * 2 + 1,
                        ease: "easeOut"
                    }}
                    style={{
                        backgroundColor: color,
                        borderRadius: Math.random() > 0.5 ? '50%' : '0%'
                    }}
                />
            ))}
        </div>
    )
}

