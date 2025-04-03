"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export function CoachingJourney() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const steps = [
        {
            number: 1,
            title: "Start your journey by knowing more about you",
            description: "Just take 5 minutes to answer a few questions for us to better know you",
            image: "/placeholder.svg?height=300&width=400",
            alt: "Survey interface with emoji ratings",
            color: "from-purple-500/10 to-purple-500/5"
        },
        {
            number: 2,
            title: "Find the coach that best suits your needs",
            description: "We will ensures you get paired with the ideal coach for your unique needs and goals",
            image: "/placeholder.svg?height=300&width=400",
            alt: "Chat interface showing coach matching",
            color: "from-orange-500/10 to-orange-500/5"
        },
        {
            number: 3,
            title: "Schedule a trial coaching session for you",
            description: "Our team will arrange a chemistry check coaching session for free",
            image: "/placeholder.svg?height=300&width=400",
            alt: "Calendar interface for scheduling",
            color: "from-pink-500/10 to-pink-500/5"
        }
    ]

    return (
        <section className="py-24 bg-[#EDE6DC]" ref={containerRef}>
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl font-normal mb-6">
                        Coaching,{" "}
                        <span className="italic font-serif">anytime, anywhere.</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Whether you're seeking a career breakthrough, navigating a transition, or striving to scale your business, 
                        we will help you find the best coach to unleash your next-level potential and achieve your goals
                    </p>
                </motion.div>

                <div className="relative h-[150vh] mb-16">
                    {steps.map((step, index) => {
                        const targetScale = 1 - (steps.length - 1 - index) * 0.05
                        const targetY = (steps.length - 1 - index) * -50

                        return (
                            <motion.div
                                key={step.number}
                                className="sticky top-[20vh]"
                                style={{
                                    scale: useTransform(
                                        scrollYProgress,
                                        [index / steps.length, (index + 1) / steps.length],
                                        [1, targetScale]
                                    ),
                                    y: useTransform(
                                        scrollYProgress,
                                        [index / steps.length, (index + 1) / steps.length],
                                        [0, targetY]
                                    ),
                                    opacity: useTransform(
                                        scrollYProgress,
                                        [index / steps.length, (index + 0.8) / steps.length],
                                        [1, index === steps.length - 1 ? 1 : 0.3]
                                    )
                                }}
                            >
                                <Card className={`bg-gradient-to-br ${step.color} backdrop-blur-sm border-0 shadow-xl`}>
                                    <CardContent className="p-8">
                                        <div className="grid md:grid-cols-2 gap-8 items-center">
                                            <div>
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="w-12 h-12 rounded-full bg-[#6B46C1] text-white flex items-center justify-center text-xl font-normal">
                                                        {step.number}
                                                    </div>
                                                    <h3 className="text-2xl font-seminormal">{step.title}</h3>
                                                </div>
                                                <p className="text-gray-600 text-lg mb-6">{step.description}</p>
                                                {index === steps.length - 1 && (
                                                    <Button
                                                        size="lg"
                                                        className="rounded-full bg-[#F36C49] hover:bg-[#E55D3A] text-white px-8"
                                                    >
                                                        Start Now
                                                        <ArrowRight className="ml-2 h-5 w-5" />
                                                    </Button>
                                                )}
                                            </div>
                                            <div className="relative h-[300px]">
                                                <Image
                                                    src={step.image}
                                                    alt={step.alt}
                                                    fill
                                                    className="object-contain rounded-lg"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

