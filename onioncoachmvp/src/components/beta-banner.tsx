"use client"

import { config } from "@/app/config"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { useState } from "react"

export function BetaBanner() {
    const [isVisible, setIsVisible] = useState(true)

    if (!config.isBeta || !isVisible) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 bg-[#6B46C1] text-white p-4 z-50"
        >
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-white/20 rounded-full text-sm font-medium">
                        BETA
                    </span>
                    <p className="text-sm">
                        Welcome to our beta! We're testing and improving. Your feedback is valuable.
                    </p>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </motion.div>
    )
} 