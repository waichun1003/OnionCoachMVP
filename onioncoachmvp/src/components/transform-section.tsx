"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ArrowRight, User, Briefcase, Award, Star, Heart, Target } from 'lucide-react'

// Mock data for coach articles
const coachArticles = [
    {
        name: "Anson Lee",
        years: "7 years Coach",
        image: "/images/image_103.jpeg",
        title: "Career Growth Specialist",
        content: "Mastering Career Transitions: A Guide to Professional Evolution",
        description: "Anson helps you navigate career changes with confidence and strategic planning."
    },
    {
        name: "Sarah Chen",
        years: "5 years Coach",
        image: "/images/image_103.jpeg",
        title: "Leadership Development Coach",
        content: "Leadership Development in the Digital Age",
        description: "Sarah specializes in leadership and team development for modern workplaces."
    },
    {
        name: "Michael Wong",
        years: "8 years Coach",
        image: "/images/image_103.jpeg",
        title: "Performance & Team Coach",
        content: "Building High-Performance Teams",
        description: "Michael offers insights on team dynamics and performance optimization."
    },
    {
        name: "Emma Davis",
        years: "6 years Coach",
        image: "/images/image_103.jpeg",
        title: "Emotional Intelligence Coach",
        content: "Emotional Intelligence in the Workplace",
        description: "Emma helps you leverage emotional intelligence for career advancement."
    },
    {
        name: "David Kim",
        years: "9 years Coach",
        image: "/images/image_103.jpeg",
        title: "Innovation & Tech Coach",
        content: "Tech Leadership: Navigating Innovation",
        description: "David guides tech leaders to drive innovation and growth."
    },
    {
        name: "Lisa Zhang",
        years: "7 years Coach",
        image: "/images/image_103.jpeg",
        title: "Branding & Strategy Coach",
        content: "Personal Branding for Professionals",
        description: "Lisa helps you build a strong professional brand and strategy."
    }
]

export function TransformSection() {
    const scrollContainerRef1 = useRef<HTMLDivElement>(null)
    const scrollContainerRef2 = useRef<HTMLDivElement>(null)
    const controls1 = useAnimation()
    const controls2 = useAnimation()

    return (
        <section className="py-24 bg-[#6B46C1] overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-white"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6">
                            Discover how coaching can{" "}
                            <span className="italic font-serif">transform your career.</span>
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-xl">
                            Discover valuable tips and content, including educational resources tailored to your career needs. Learn how to navigate your career growth with a new perspective and mindset
                        </p>
                        <Button
                            size="lg"
                            className="rounded-full bg-[#F36C49] hover:bg-[#E55D3A] text-white"
                        >
                            Explore more
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full items-stretch">
                        {coachArticles.map((article, index) => (
                            <div className="h-full flex" key={index}>
                                <ArticleCard article={article} index={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function ArticleCard({ article, index }: { article: typeof coachArticles[0], index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="transform transition-transform flex flex-col h-full w-full"
        >
            <Card className="bg-white overflow-hidden hover:shadow-lg transition-shadow rounded-[30px] flex flex-col h-full">
                <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0 flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-purple-100">
                                <Image
                                    src={article.image}
                                    alt={article.name}
                                    width={80}
                                    height={80}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                                <div>
                                    <h3 className="font-seminormal text-base text-gray-900">{article.name}</h3>
                                    <p className="text-xs text-gray-600">{article.years}</p>
                                </div>
                            </div>
                            <h4 className="font-seminormal mb-1 text-sm text-gray-900">
                                {article.title}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-3">
                                {article.description}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

