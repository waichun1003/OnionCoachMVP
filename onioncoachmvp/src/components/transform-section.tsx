"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ArrowRight } from 'lucide-react'

// Mock data for coach articles
const coachArticles = [
    {
        name: "Anson Lee",
        years: "7 years Coach",
        image: "/images/image_103.png",
        title: "Find the coach that best suits your needs",
        content: "Mastering Career Transitions: A Guide to Professional Evolution",
        description: "We will ensures you get paired with the ideal coach for your unique needs and goals. Learn how to navigate career changes with confidence and strategic planning."
    },
    {
        name: "Sarah Chen",
        years: "5 years Coach",
        image: "/images/image_103.png",
        title: "Find the coach that best suits your needs",
        content: "Leadership Development in the Digital Age",
        description: "Specialized in career transitions and leadership development. Discover key strategies for becoming an effective leader in today's rapidly evolving workplace."
    },
    {
        name: "Michael Wong",
        years: "8 years Coach",
        image: "/images/image_103.png",
        title: "Find the coach that best suits your needs",
        content: "Building High-Performance Teams",
        description: "Expert insights on team dynamics and performance optimization. Learn proven methods for fostering collaboration and achieving exceptional results."
    },
    {
        name: "Emma Davis",
        years: "6 years Coach",
        image: "/images/image_103.png",
        title: "Find the coach that best suits your needs",
        content: "Emotional Intelligence in the Workplace",
        description: "Discover how to leverage emotional intelligence for better workplace relationships and career advancement."
    },
    {
        name: "David Kim",
        years: "9 years Coach",
        image: "/images/image_103.png",
        title: "Find the coach that best suits your needs",
        content: "Tech Leadership: Navigating Innovation",
        description: "Insights on leading technical teams and driving innovation in fast-paced Personal Growths."
    },
    {
        name: "Lisa Zhang",
        years: "7 years Coach",
        image: "/images/image_103.png",
        title: "Find the coach that best suits your needs",
        content: "Personal Branding for Professionals",
        description: "Learn how to build and maintain a strong professional brand that sets you apart in your industry."
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
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
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

                    <div className="grid grid-cols-2 gap-4 h-[800px]">
                        <div className="h-full overflow-hidden relative">
                            <div
                                ref={scrollContainerRef1}
                                className="absolute inset-0 space-y-4 pr-2"
                            >
                                <motion.div
                                    animate={controls1}
                                    className="space-y-4"
                                >
                                    {[...coachArticles, ...coachArticles].map((article, index) => (
                                        <ArticleCard key={`left-${index}`} article={article} index={index} />
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                        <div className="h-full overflow-hidden relative">
                            <div
                                ref={scrollContainerRef2}
                                className="absolute inset-0 space-y-4 pl-2"
                            >
                                <motion.div
                                    animate={controls2}
                                    className="space-y-4"
                                >
                                    {[...coachArticles, ...coachArticles].map((article, index) => (
                                        <ArticleCard key={`right-${index}`} article={article} index={index} />
                                    ))}
                                </motion.div>
                            </div>
                        </div>
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
            className="transform transition-transform"
        >
            <Card className="bg-white overflow-hidden hover:shadow-lg transition-shadow rounded-[30px]">
                <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
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

