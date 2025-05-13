"use client"

import { useRef, useEffect, useLayoutEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ArrowRight, User, Briefcase, Award, Star, Heart, Target } from 'lucide-react'

const coachImages = [
    '/images/coach1.jpeg',
    '/images/coach2.jpeg',
    '/images/coach3.jpeg',
    '/images/coach4.jpeg',
    '/images/coach5.jpeg',
    '/images/coach6.jpeg',
];

function getRandomCoachImage() {
    return coachImages[Math.floor(Math.random() * coachImages.length)];
}

const cards = [
    {
        type: 'text',
        name: 'Anson Lee',
        years: '7 years Coach',
        avatar: '/images/coach1.jpeg',
        title: 'Find the coach that best suits your needs',
        description: 'We will ensures you get paired with the ideal coach for your unique needs and goals.'
    },
    {
        type: 'image',
        image: '/images/coach2.jpeg',
        overlayText: 'Find the coach that best suits your needs'
    },
    {
        type: 'text',
        name: 'Eric Chan',
        years: '7 years Coach',
        avatar: '/images/coach3.jpeg',
        title: 'Find the coach that best suits your needs',
        description: 'We will ensures you get paired with the ideal coach for your unique needs and goals.'
    },
    {
        type: 'image',
        image: '', // Intentionally left blank to test fallback
        overlayText: 'Find the coach that best suits your needs'
    },
    {
        type: 'text',
        name: 'Emma Davis',
        years: '6 years Coach',
        avatar: '', // Intentionally left blank to test fallback
        title: 'Emotional Intelligence Coach',
        description: 'Emma helps you leverage emotional intelligence for career advancement.'
    },
    {
        type: 'text',
        name: 'David Kim',
        years: '9 years Coach',
        avatar: '/images/coach6.jpeg',
        title: 'Innovation & Tech Coach',
        description: 'David guides tech leaders to drive innovation and growth.'
    }
]

export function TransformSection() {
    // For desktop auto-scroll
    const gridRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        let animationFrame: number;
        const speed = 2.0; // px per ms (increased for faster scroll)
        function animateScroll() {
            if (gridRef.current) {
                const grid = gridRef.current;
                const maxScroll = grid.scrollHeight - grid.clientHeight;
                if (maxScroll > 0) {
                    grid.scrollTop += speed;
                    if (grid.scrollTop >= maxScroll) {
                        grid.scrollTop = 1;
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
                    <h2 className="text-5xl font-normal text-white mb-6">
                        Discover how coaching can{" "}
                        <span className="italic font-serif">transform your career.</span>
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-xl">
                        Discover valuable tips and content, including educational resources tailored to your career needs. Learn how to navigate your career growth with a new perspective and mindset
                    </p>
                    <Button className="rounded-full bg-[#F36C49] hover:bg-[#E55D3A] text-white w-fit">
                        Explore more <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
                {/* Right: Card Grid (desktop) or below content (mobile) */}
                <div className="flex-1 flex flex-col justify-end w-full md:w-1/2 mt-8 md:mt-0">
                    {/* Mobile: horizontal auto-scroll cards below content */}
                    <MobileHorizontalAutoScrollCards />
                    {/* Desktop: vertical grid, right side */}
                    <div
                        ref={gridRef}
                        className="hidden md:grid md:grid-cols-2 gap-8 w-full h-full min-h-[70vh] max-h-[80vh] overflow-y-scroll pr-2 rounded-2xl bg-transparent scrollbar-hide"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {[...cards, ...cards].map((card, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: idx * 0.08 }}
                                whileHover={{ y: -8, boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)' }}
                                className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between min-h-[260px] h-full transition-all duration-300 cursor-pointer"
                            >
                                {card.type === 'image' ? (
                                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden flex-1 flex">
                                        <img src={card.image || getRandomCoachImage()} alt="" className="object-cover w-full h-full" />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white px-5 py-4 text-lg font-semibold rounded-b-2xl">
                                            {card.overlayText}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-4 mb-4">
                                            <img src={card.avatar || getRandomCoachImage()} className="w-14 h-14 rounded-full object-cover border-2 border-[#6B46C1]" alt="" />
                                            <div>
                                                <div className="font-semibold text-lg text-gray-900">{card.name}</div>
                                                <div className="text-xs text-gray-500">{card.years}</div>
                                            </div>
                                        </div>
                                        <div className="font-bold mb-2 text-xl text-gray-900 leading-snug">{card.title}</div>
                                        <div className="text-base text-gray-600 leading-relaxed">{card.description}</div>
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function ArticleCard({ article, index }: { article: typeof cards[0], index: number }) {
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
                                    src={article.image || ''}
                                    alt={article.name || ''}
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

// --- Mobile horizontal auto-scroll cards component ---
function MobileHorizontalAutoScrollCards() {
    const rowRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);
    // Use a ref callback to ensure the DOM node is available
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
        const speed = 3.5; // px per frame for visibility
        function isVisible(el: HTMLElement) {
            return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
        }
        if (rowRef.current) {
            console.log('MOUNTED', rowRef.current);
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
                    console.log('Auto-scroll running', row.scrollLeft, maxScroll);
                }
                animationFrame = requestAnimationFrame(animateScroll);
            }
        }
        timeout = setTimeout(() => {
            if (window.innerWidth < 768) {
                console.log('ANIMATION START');
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
            {[...cards, ...cards, ...cards].map((card, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: idx * 0.08 }}
                    className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between min-h-[260px] h-full transition-all duration-300 cursor-pointer w-[90vw] min-w-[85vw] max-w-[95vw] mx-2"
                >
                    {card.type === 'image' ? (
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden flex-1 flex">
                            <img src={card.image || getRandomCoachImage()} alt="" className="object-cover w-full h-full" />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white px-5 py-4 text-lg font-semibold rounded-b-2xl">
                                {card.overlayText}
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center gap-4 mb-4">
                                <img src={card.avatar || getRandomCoachImage()} className="w-14 h-14 rounded-full object-cover border-2 border-[#6B46C1]" alt="" />
                                <div>
                                    <div className="font-semibold text-lg text-gray-900">{card.name}</div>
                                    <div className="text-xs text-gray-500">{card.years}</div>
                                </div>
                            </div>
                            <div className="font-bold mb-2 text-xl text-gray-900 leading-snug">{card.title}</div>
                            <div className="text-base text-gray-600 leading-relaxed">{card.description}</div>
                        </>
                    )}
                </motion.div>
            ))}
        </div>
    );
}

