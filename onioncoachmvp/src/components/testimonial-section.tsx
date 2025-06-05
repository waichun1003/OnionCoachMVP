"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { CoachForm } from "@/components/coach-form"

const testimonials = [
    {
        name: "Joanna Zhang",
        title: "Co-founder of Onion Coach, former Ogilvy strategist, and lecturer at Hong Kong Baptist University",
        image: "/images/coach1.jpeg",
        quote: "As your career coach, I've seen how personalized plans can transform your approach to work challenges. With flexible online sessions, I ensure that coaching fits seamlessly into your busy schedule. My goal is to make you feel heard, understood, and supported, leading to significant improvements in your career journey."
    },
    {
        name: "Dana Yu",
        title: "Head Coach, ICF-certified ACC coach, IPMA-certified international trainer",
        image: "/images/coach2.jpeg",
        quote: "Left a million-dollar salary to become a freelance trainer and coach. Provides training and coaching to hundreds of executives. Through our coaching partnership, we'll work together to unlock your leadership potential. I believe in creating a safe space for exploration and growth, helping you navigate complex career decisions with confidence and clarity."
    },
    {
        name: "Yuki Zhang",
        title: "Guiding Coach, ICF-certified NLP coach, ICC team coach, AOEC-certified",
        image: "/images/coach3.jpeg",
        quote: "Specializes in organizational change, sales, visual communication, and psychology. Assisted hundreds of teams and over a thousand individuals. My approach combines strategic thinking with emotional intelligence. We'll focus on developing your unique strengths while addressing growth areas, ensuring you're well-equipped to tackle any professional challenge."
    }
]

export function TestimonialSection() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [isCoachFormOpen, setIsCoachFormOpen] = useState(false)

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        })
    }

    const swipeConfidenceThreshold = 10000
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity
    }

    const paginate = (newDirection: number) => {
        setDirection(newDirection)
        setIsLoading(true)
        setCurrentIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length)
    }

    return (
        <section className="py-24 bg-[#EDE6DC]">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
                        <div>
                            <motion.h2
                                className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                Our coaches truly understand{" "}
                                <span className="italic font-serif">your needs.</span>
                            </motion.h2>
                        </div>
                        <div>
                            <motion.p
                                className="text-xl text-gray-700 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                We work with trained and licensed professional coaches who have over 10 years of experience in certain industries and have chosen coaching as their second career
                            </motion.p>
                            
                            <motion.p
                                className="text-lg text-gray-600 mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.25 }}
                            >
                                Ready to transform careers? Join our team of professional coaches.
                            </motion.p>

                            <motion.div
                                className="flex flex-wrap gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <Button
                                    size="lg"
                                    className="rounded-full bg-[#F36C49] hover:bg-[#E55D3A] text-white"
                                    onClick={() => setIsCoachFormOpen(true)}
                                >
                                    Apply as Coach
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </motion.div>
                        </div>
                    </div>

                    <div className="relative mt-16">
                        <div className="overflow-hidden relative">
                            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.4 },
                                        scale: { duration: 0.4 }
                                    }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={1}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipe = swipePower(offset.x, velocity.x)
                                        if (swipe < -swipeConfidenceThreshold) {
                                            paginate(1)
                                        } else if (swipe > swipeConfidenceThreshold) {
                                            paginate(-1)
                                        }
                                    }}
                                    className="bg-white rounded-3xl p-4 md:p-6 lg:p-8"
                                >
                                    <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center max-w-5xl mx-auto">
                                        <motion.div 
                                            className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-gray-100"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            style={{
                                                maxHeight: '400px',
                                                minHeight: '300px'
                                            }}
                                        >
                                            {isLoading && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                            <Image
                                                src={testimonials[currentIndex].image}
                                                alt={testimonials[currentIndex].name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 400px"
                                                quality={100}
                                                priority
                                                className={`object-cover transition-all duration-500 ${
                                                    isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                                                }`}
                                                style={{
                                                    objectFit: 'cover',
                                                    objectPosition: 'center top'
                                                }}
                                                onLoadingComplete={() => setIsLoading(false)}
                                            />
                                        </motion.div>
                                        <motion.div 
                                            className="flex flex-col justify-center max-w-lg px-2 md:px-4"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <div className="mb-6">
                                                <motion.div
                                                    className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-4"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.4, type: "spring" }}
                                                >
                                                    <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                                                    </svg>
                                                </motion.div>
                                                <motion.p 
                                                    className="text-lg md:text-xl text-gray-800 mb-6"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.5 }}
                                                >
                                                    {testimonials[currentIndex].quote}
                                                </motion.p>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.6 }}
                                                >
                                                    <h3 className="text-lg font-seminormal text-gray-900">
                                                        {testimonials[currentIndex].name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        {testimonials[currentIndex].title}
                                                    </p>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex justify-center gap-3 mt-8">
                                {testimonials.map((_, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => {
                                            const newDirection = index > currentIndex ? 1 : -1
                                            setDirection(newDirection)
                                            setCurrentIndex(index)
                                        }}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            currentIndex === index 
                                                ? 'bg-[#F36C49] w-8' 
                                                : 'bg-gray-300 w-2 hover:bg-gray-400'
                                        }`}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isCoachFormOpen && <CoachForm onClose={() => setIsCoachFormOpen(false)} />}
            </AnimatePresence>
        </section>
    )
}

