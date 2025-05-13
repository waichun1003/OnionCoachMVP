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
    const [imagesLoaded, setImagesLoaded] = useState([false, false, false, false])
    const allLoaded = imagesLoaded.every(Boolean)
    const handleImageLoad = (idx: number) => {
      setImagesLoaded(prev => {
        const next = [...prev]
        next[idx] = true
        return next
      })
    }

    const mobileGridVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } }
    }

    return (
        <div ref={containerRef} className="relative pt-12">
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
                        <h1 className="text-6xl sm:text-5xl md:text-7xl lg:text-8xl font-normal mb-4 md:mb-6">
                            Coaching for your next{" "}
                            <span className="italic font-serif">breakthrough.</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
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

                    {/* Desktop flex row (md+) */}
                    <motion.div
                      className="hidden md:flex flex-row items-end w-full mt-12 gap-2"
                      style={{ paddingLeft: 0, marginLeft: 0 }}
                      initial="hidden"
                      animate={allLoaded ? 'visible' : 'hidden'}
                    >
                      {/* Orange Circle (Coach 1) */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 40 },
                          visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.5 } }
                        }}
                        className="relative w-[244.7px] h-[244.7px] ml-[-100px]"
                      >
                        <div className="absolute inset-0 rounded-full bg-[#FF6512]" />
                        {!imagesLoaded[0] && (
                          <div className="absolute inset-0 rounded-full bg-[#FF6512] animate-pulse" />
                        )}
                        <Image
                          src="/images/image_114.jpeg"
                          alt="Coach 1"
                          fill
                          className="object-cover rounded-full transition-opacity duration-500"
                          style={{ opacity: imagesLoaded[0] ? 1 : 0 }}
                          onLoad={() => handleImageLoad(0)}
                        />
                      </motion.div>
                      {/* First Purple Ellipse */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 40 },
                          visible: { opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.5 } }
                        }}
                        className="w-[140px] h-[280px] bg-[#6B46C1] rounded-r-full shadow-xl"
                      />
                      {/* Second Purple Ellipse */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 40 },
                          visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5 } }
                        }}
                        className="w-[140px] h-[280px] bg-[#6B46C1] rounded-r-full shadow-xl"
                      />
                      {/* Yellow Circle (Coach 2) */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 40 },
                          visible: { opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.5 } }
                        }}
                        className="relative w-[248px] h-[280px]"
                      >
                        <div className="absolute inset-0 rounded-full bg-[#FFB541]" />
                        {!imagesLoaded[1] && (
                          <div className="absolute inset-0 rounded-full bg-[#FFB541] animate-pulse" />
                        )}
                        <Image
                          src="/images/image_103.jpeg"
                          alt="Coach 2"
                          fill
                          className="object-cover rounded-full transition-opacity duration-500"
                          style={{ opacity: imagesLoaded[1] ? 1 : 0 }}
                          onLoad={() => handleImageLoad(1)}
                        />
                      </motion.div>
                      {/* People Crossing Elliptical Mask */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 40 },
                          visible: { opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.5 } }
                        }}
                        className="relative w-[476px] h-[232px]"
                        style={{ borderRadius: '120px / 100px', overflow: 'hidden', background: '#fff' }}
                      >
                        {!imagesLoaded[2] && (
                          <div className="absolute inset-0 bg-gray-200 animate-pulse" style={{ borderRadius: '120px / 100px' }} />
                        )}
                        <Image
                          src="/images/Rectangle_2157.jpeg"
                          alt="People crossing"
                          fill
                          className="object-cover transition-opacity duration-500"
                          style={{ opacity: imagesLoaded[2] ? 1 : 0 }}
                          onLoad={() => handleImageLoad(2)}
                        />
                      </motion.div>
                      {/* Right Orange Rounded Rectangle flush right (Coach 3) */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 40 },
                          visible: { opacity: 1, y: 0, transition: { delay: 0.85, duration: 0.5 } }
                        }}
                        className="relative w-[260px] h-[260px] mr-[-100px]"
                        style={{ borderRadius: '120px', overflow: 'hidden', background: '#FF6512' }}
                      >
                        {!imagesLoaded[3] && (
                          <div className="absolute inset-0 bg-[#FF6512] animate-pulse" style={{ borderRadius: '120px' }} />
                        )}
                        <Image
                          src="/images/image_113.jpeg"
                          alt="Coach 3"
                          fill
                          className="object-cover transition-opacity duration-500"
                          style={{ opacity: imagesLoaded[3] ? 1 : 0 }}
                          onLoad={() => handleImageLoad(3)}
                        />
                      </motion.div>
                    </motion.div>

                    {/* Mobile grid layout - match original design with ellipses */}
                    <motion.div
                      className="grid grid-cols-4 grid-rows-2 gap-0 md:hidden w-full mt-8"
                      variants={mobileGridVariants}
                      initial="hidden"
                      animate={allLoaded ? 'visible' : 'hidden'}
                    >
                      {/* Top row: Orange Circle, Left Ellipse, Right Ellipse, Yellow Circle */}
                      <div className="flex items-center justify-center">
                        <div className="relative w-36 h-36 rounded-full overflow-hidden bg-[#FF6512] self-center">
                          {!imagesLoaded[0] && (
                            <div className="absolute inset-0 rounded-full bg-[#FF6512] animate-pulse" />
                          )}
                          <Image
                            src="/images/image_114.jpeg"
                            alt="Coach 1"
                            fill
                            className="object-cover rounded-full transition-opacity duration-500"
                            style={{ opacity: imagesLoaded[0] ? 1 : 0 }}
                            onLoad={() => handleImageLoad(0)}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="inline-flex items-center justify-center w-auto">
                          <div className="relative overflow-hidden flex items-center justify-center" style={{ width: '70px', height: '140px' }}>
                            <div className="absolute bg-[#6B46C1]" style={{ width: '140px', height: '140px', borderRadius: '50%', left: '-70px', top: '0' }} />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="inline-flex items-center justify-center w-auto -ml-4">
                          <div className="relative overflow-hidden flex items-center justify-center" style={{ width: '70px', height: '140px' }}>
                            <div className="absolute bg-[#6B46C1]" style={{ width: '140px', height: '140px', borderRadius: '50%', left: '-70px', top: '0' }} />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="relative w-36 h-36 rounded-full overflow-hidden bg-[#FFB541] self-center">
                          {!imagesLoaded[1] && (
                            <div className="absolute inset-0 rounded-full bg-[#FFB541] animate-pulse" />
                          )}
                          <Image
                            src="/images/image_103.jpeg"
                            alt="Coach 2"
                            fill
                            className="object-cover rounded-full transition-opacity duration-500"
                            style={{ opacity: imagesLoaded[1] ? 1 : 0 }}
                            onLoad={() => handleImageLoad(1)}
                          />
                        </div>
                      </div>
                      {/* Bottom row: People Crossing (ellipse, 3 cols), Orange Circle (Coach 3) */}
                      <div className="col-span-3 flex items-center justify-center">
                        <div className="relative w-full h-32 rounded-full overflow-hidden bg-[#fff]" style={{ borderRadius: '80px / 40px' }}>
                          {!imagesLoaded[2] && (
                            <div className="absolute inset-0 bg-gray-200 animate-pulse" style={{ borderRadius: '80px / 40px' }} />
                          )}
                          <Image
                            src="/images/Rectangle_2157.jpeg"
                            alt="People crossing"
                            fill
                            className="object-cover transition-opacity duration-500"
                            style={{ opacity: imagesLoaded[2] ? 1 : 0, borderRadius: '80px / 40px' }}
                            onLoad={() => handleImageLoad(2)}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="relative w-36 h-36 rounded-full overflow-hidden bg-[#FF6512] self-center">
                          {!imagesLoaded[3] && (
                            <div className="absolute inset-0 rounded-full bg-[#FF6512] animate-pulse" />
                          )}
                          <Image
                            src="/images/image_113.jpeg"
                            alt="Coach 3"
                            fill
                            className="object-cover rounded-full transition-opacity duration-500"
                            style={{ opacity: imagesLoaded[3] ? 1 : 0 }}
                            onLoad={() => handleImageLoad(3)}
                          />
                        </div>
                      </div>
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
