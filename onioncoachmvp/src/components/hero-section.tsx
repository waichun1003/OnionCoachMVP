"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { WaitlistModal } from './waitlist-modal'

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const y = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "50%"]), {
        stiffness: 100,
        damping: 30,
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0])

    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div ref={containerRef} className="relative pt-28">
            <motion.section
                className="relative min-h-screen flex items-center justify-center overflow-hidden"
                style={{ opacity }}
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        className="max-w-4xl mx-auto text-center mb-20"
                        style={{ y }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal mb-6">
                            Coaching for your next{" "}
                            <span className="italic font-serif">breakthrough.</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Empower mid-level professionals and business owners to increase self-awareness and
                            accelerate growth
                        </p>
                        <Button
                            size="lg"
                            className="rounded-full bg-[#664ec9] hover:bg-purple-700 font-medium"
                            asChild
                        >
                            <Link href="/register">
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </motion.div>

                    <motion.div
                        className="flex justify-center items-center gap-4 mt-12"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="relative w-[280px] h-[280px] rounded-full overflow-hidden bg-[#FF5733] shadow-xl"
                        >
                            <Image
                                src="/images/image_114.png"
                                alt="Coach 1"
                                fill
                                quality={100}
                                sizes="(max-width: 768px) 280px, 280px"
                                className="object-cover object-center"
                                priority
                            />
                        </motion.div>

                        <div className="flex -space-x-0">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.4 }}
                                className="w-[140px] h-[280px] bg-[#6B46C1] rounded-r-full shadow-xl"
                            />
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.4 }}
                                className="w-[140px] h-[280px] bg-[#6B46C1] rounded-r-full shadow-xl"
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                            className="relative w-[300px] h-[350px] rounded-full overflow-hidden bg-[#FDB347] shadow-xl"
                        >
                            <Image
                                src="/images/image_103.png"
                                alt="Coach 2"
                                fill
                                quality={100}
                                sizes="(max-width: 768px) 300px, 300px"
                                className="object-cover object-center"
                                priority
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="relative w-[550px] h-[280px] overflow-hidden rounded-2xl shadow-xl"
                        >
                            <Image
                                src="/images/Rectangle_2157.png"
                                alt="People crossing"
                                fill
                                quality={100}
                                sizes="(max-width: 768px) 550px, 550px"
                                className="object-cover object-center"
                                priority
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1 }}
                            className="relative w-[300px] h-[300px] rounded-full overflow-hidden bg-[#FF5733] shadow-xl"
                        >
                            <Image
                                src="/images/image_113.png"
                                alt="Coach 3"
                                fill
                                quality={100}
                                sizes="(max-width: 768px) 300px, 300px"
                                className="object-cover object-center"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            <section className="bg-[#6B46C1] py-20 mt-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-normal text-white mb-4">
                                Find your perfect coach through{" "}
                                <span className="italic font-serif">our matching.</span>
                            </h2>
                        </div>
                        <div>
                            <p className="text-xl text-white/90 mb-8">
                                Unlock your potential with our coach-matching service. Simply fill out this form to find
                                a coach that matches your experience and preferences.
                            </p>
                            <Button
                                size="lg"
                                className="rounded-full bg-[#F36C49] hover:bg-[#E55D3A] text-white"
                                asChild
                            >
                                <Link href="/find-coach">
                                    Find your coach
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <WaitlistModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}
