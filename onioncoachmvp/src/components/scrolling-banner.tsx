"use client"

import { motion } from "framer-motion"
import { ArrowRight } from 'lucide-react'

export function ScrollingBanner() {
    return (
        <div className="bg-[#F36C49] text-white overflow-hidden py-3">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{
                    x: [0, -1000],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 20,
                        ease: "linear",
                    },
                }}
            >
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-8 mx-8">
                        <span>get the limited discount offer</span>
                        <ArrowRight className="h-4 w-4" />
                        <span className="italic font-serif">publicly for a trial coachoing today</span>
                        <ArrowRight className="h-4 w-4" />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

