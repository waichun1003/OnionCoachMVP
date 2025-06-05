"use client"

import { useRef, useEffect, useLayoutEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, User, Briefcase, Award, Star, Heart, Target, Quote } from 'lucide-react'

// Real customer testimonials from workshops
const testimonials = [
    {
        type: 'testimonial',
        name: 'Yilin Huang',
        role: 'Career Design Workshop Participant',
        avatar: '/images/yilin.png',
        quote: 'The career design workshop completely exceeded my expectations. Everyone was relaxed under Dana and Joanna\'s guidance, making the process enjoyable and bringing us closer to our true selves.',
        bgColor: 'bg-white',
        textColor: 'text-gray-800'
    },
    {
        type: 'testimonial', 
        name: 'Yuying Zhang',
        role: 'Coaching Session Participant',
        avatar: '/images/yuying.png',
        quote: 'The coaching session was amazing! Coaches were super friendly and highly professional. I walked away with useful tips and a big boost of confidence. It\'s a must-try for anyone seeking growth. I feel inspired and eager to implement what I learned.',
        bgColor: 'bg-white',
        textColor: 'text-gray-800'
    },
    {
        type: 'testimonial',
        name: 'Beiqi Chen',
        role: 'Workshop Participant', 
        avatar: '/images/beiqi.png',
        quote: 'The whole coaching session shared a very uplifting and relaxing vibe. Coaches are warm and professional. You can really get applicable takeaways and truly enjoy the feeling of being supported after that.',
        bgColor: 'bg-white',
        textColor: 'text-gray-800'
    },
    {
        type: 'testimonial',
        name: 'Shiyu Miao',
        role: 'Online Workshop Attendee',
        avatar: '/images/shiyu.png',
        quote: 'It was a very rewarding and fulfilling experience to attend Onion coach\'s online workshop. I learned a lot from my peers and coaches, gaining invaluable insights and new perspectives.',
        bgColor: 'bg-white',
        textColor: 'text-gray-800'
    },
    {
        type: 'testimonial',
        name: 'Fish',
        role: 'Hero\'s Journey Participant', 
        avatar: '/images/fish.png',
        quote: 'The content of Coach Onion\'s Hero\'s Journey workshop was designed very attentively. As a participant, I was able to gain insights from different perspectives, rediscover myself, and find guiding suggestions for my future work and life.',
        bgColor: 'bg-white',
        textColor: 'text-gray-800'
    },
    {
        type: 'testimonial',
        name: 'Miu Miu', 
        role: 'Growth Workshop Member',
        avatar: '/images/miumiu.png',
        quote: 'Growth can feel isolating, but here, we weren\'t alone. Onion Coach\'s \'outsider lens\' helped me release old burdens, reframe challenges, and reclaim my power to face the future - with solutions and a smile.',
        bgColor: 'bg-white',
        textColor: 'text-gray-800'
    }
]

export function TransformSection() {
    // For desktop auto-scroll
    const gridRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        let animationFrame: number;
        const speed = 0.5; // px per frame for slower, more gentle scrolling
        function animateScroll() {
            if (gridRef.current && window.innerWidth >= 768) {
                const grid = gridRef.current;
                const maxScroll = grid.scrollHeight - grid.clientHeight;
                if (maxScroll > 0) {
                    grid.scrollTop += speed;
                    if (grid.scrollTop >= maxScroll) {
                        grid.scrollTop = 1; // seamless loop
                    }
                }
            }
            animationFrame = requestAnimationFrame(animateScroll);
        }
        animationFrame = requestAnimationFrame(animateScroll);
        return () => cancelAnimationFrame(animationFrame);
    }, [])

    return (
        <section className="min-h-screen bg-[#6B46C1] flex flex-col md:flex-row items-stretch py-24 h-full">
            <div className="container mx-auto px-4 flex flex-col md:flex-row h-full w-full">
                {/* Left: Headline/CTA */}
                <div className="flex-1 flex flex-col justify-center h-full w-full md:w-1/2 md:pr-12">
                    <motion.h2 
                        className="text-5xl font-normal text-white mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        Discover how{" "}
                        <span className="italic font-serif">coaching</span>{" "}
                        can transform your career.
                    </motion.h2>
                    <motion.p 
                        className="text-xl text-white/90 mb-8 max-w-xl"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Discover how our coaching workshops have transformed careers and lives. These authentic testimonials showcase the real impact of our personalized coaching approach.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Button
                            size="lg"
                            className="rounded-full bg-[#F36C49] hover:bg-[#E55D3A] text-white"
                            asChild
                        >
                            <Link href="/find-coach">
                                Explore more
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
                
                {/* Right: Testimonial Cards */}
                <div className="flex-1 flex flex-col justify-end w-full md:w-1/2 mt-8 md:mt-0">
                    {/* Mobile: horizontal auto-scroll cards below content */}
                    <MobileHorizontalTestimonials />
                    {/* Desktop: auto-scrolling grid */}
                    <div 
                        ref={gridRef}
                        className="hidden md:grid md:grid-cols-2 gap-4 w-full h-full max-h-[70vh] overflow-y-scroll pr-2 scrollbar-hide"
                    >
                        {[...testimonials, ...testimonials].map((testimonial, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: idx * 0.08 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className={`${testimonial.bgColor} ${testimonial.textColor} rounded-3xl shadow-xl p-5 flex flex-col justify-between min-h-[280px] transition-all duration-300 cursor-pointer relative overflow-hidden`}
                            >
                                {/* Decorative background elements */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-full -translate-y-12 translate-x-12"></div>
                                <div className="absolute bottom-0 left-0 w-20 h-20 bg-purple-50 rounded-full translate-y-10 -translate-x-10"></div>
                                
                                <div className="relative z-10">
                                    <Quote className="w-6 h-6 mb-3 text-purple-600" />
                                    <p className="text-sm leading-relaxed mb-4 font-medium">
                                        "{testimonial.quote}"
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 relative z-10">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                                        <img 
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                console.error('Failed to load image:', testimonial.avatar);
                                                e.currentTarget.style.display = 'none';
                                                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                                if (fallback) fallback.style.display = 'flex';
                                            }}
                                        />
                                        <User className="w-5 h-5 text-gray-400" style={{ display: 'none' }} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">{testimonial.name}</div>
                                        <div className="text-xs text-gray-600">{testimonial.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

// --- Mobile horizontal auto-scroll testimonials component ---
function MobileHorizontalTestimonials() {
    const rowRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);
    
    const setRowRef = (node: HTMLDivElement | null) => {
        rowRef.current = node;
    };
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    useEffect(() => {
        if (!mounted) return;
        if (typeof window === 'undefined') return;
        let animationFrame: number;
        let timeout: NodeJS.Timeout;
        const speed = 1.0; // px per frame for slower, more gentle scrolling
        
        function isVisible(el: HTMLElement) {
            return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
        }
        
        function animateScroll() {
            const row = rowRef.current;
            if (row && window.innerWidth < 768 && isVisible(row)) {
                const maxScroll = row.scrollWidth - row.clientWidth;
                if (maxScroll > 0) {
                    row.scrollLeft += speed;
                    if (row.scrollLeft >= maxScroll) {
                        row.scrollLeft = 1; // seamless loop
                    }
                }
                animationFrame = requestAnimationFrame(animateScroll);
            }
        }
        
        timeout = setTimeout(() => {
            if (window.innerWidth < 768) {
                animationFrame = requestAnimationFrame(animateScroll);
            }
        }, 100);
        
        function handleResize() {
            cancelAnimationFrame(animationFrame);
            if (window.innerWidth < 768) {
                animationFrame = requestAnimationFrame(animateScroll);
            }
        }
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', handleResize);
        };
    }, [mounted]);
    
    return (
        <div className="flex md:hidden flex-row overflow-x-auto w-full py-2 scrollbar-hide" ref={setRowRef}>
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: idx * 0.1 }}
                    className={`${testimonial.bgColor} ${testimonial.textColor} rounded-3xl shadow-xl p-6 flex flex-col justify-between min-h-[280px] transition-all duration-300 cursor-pointer w-[85vw] min-w-[80vw] max-w-[90vw] mx-3 relative overflow-hidden`}
                >
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-full -translate-y-12 translate-x-12"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-purple-50 rounded-full translate-y-10 -translate-x-10"></div>
                    
                    {testimonial.type === 'testimonial' && (
                        <>
                            <div className="relative z-10">
                                <Quote className="w-6 h-6 mb-3 text-purple-600" />
                                <p className="text-sm leading-relaxed mb-4 font-medium">
                                    "{testimonial.quote}"
                                </p>
                            </div>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                                    <img 
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                        style={{ display: 'block' }}
                                        onError={(e) => {
                                            console.error('Failed to load image:', testimonial.avatar);
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                    <User className="w-6 h-6 text-gray-400" style={{ display: 'none' }} />
                                </div>
                                <div>
                                    <div className="font-semibold">{testimonial.name}</div>
                                    <div className="text-xs text-gray-600">{testimonial.role}</div>
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>
            ))}
        </div>
    );
}

