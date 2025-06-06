"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface Step {
    number: string;
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    imageUrl: string;
    bgColor: string;
    textColor?: string;
    subtitleBgColor?: string;
}

const steps: Step[] = [
    {
      number: "01",
        title: "Set Up Your Mission",
      subtitle: "Mission",
      description: "Define your growth goals and create a personalized roadmap for success. Our AI-powered system analyzes your strengths, weaknesses, and aspirations to craft a tailored journey that aligns with your unique objectives and learning style.",
      buttonText: "View More",
      imageUrl: "/images/step-1.jpeg",
      bgColor: "#EDE6DC", // Updated to requested color
      textColor: "text-black",
      subtitleBgColor: "#E9D8FD"
    },
    {
      number: "02",
        title: "Daily Quests",
      subtitle: "Quests",
      description: "Complete daily tasks to earn points and advance through levels. Each quest is designed to build specific skills and habits that contribute to your overall growth. Track your progress, earn rewards, and stay motivated with our gamified approach to personal development.",
      buttonText: "Learn More",
      imageUrl: "/images/step-2.jpeg",
      bgColor: "#EDE6DC", // Updated to requested color
      textColor: "text-black",
      subtitleBgColor: "#CCCCCC"
    },
    {
      number: "03",
        title: "Celebrate Achievements",
      subtitle: "Achievements",
      description: "Earn badges for reaching milestones and mastering skills. Our recognition system acknowledges your progress at every step, providing positive reinforcement and visual representations of your growth journey. Share your achievements with peers and build a portfolio of your accomplishments.",
      buttonText: "View More",
      imageUrl: "/images/step-3.jpeg",
      bgColor: "#EDE6DC", // Updated to requested color
      textColor: "text-black",
      subtitleBgColor: "#E9D8FD"
    },
    {
      number: "04",
        title: "Join Communities",
      subtitle: "Connect",
      description: "Connect with peers and coaches for support and collaboration. Our community platform brings together like-minded individuals on similar growth paths, creating opportunities for knowledge sharing, accountability partnerships, and mentorship. Engage in group challenges and learn from others' experiences.",
      buttonText: "View More",
      imageUrl: "/images/step-4.jpeg",
      bgColor: "#EDE6DC", // Updated to requested color
      textColor: "text-black",
      subtitleBgColor: "#CCCCCC"
    }
  ]

export function GamifiedJourney() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const firstCardRef = useRef<HTMLDivElement>(null)
    
    // Use all steps for the stack cards now
    const allSteps = steps;
    const firstStep = steps[0];
    
    // Calculate constants for step transitions
    const totalSteps = steps.length - 1;
    const STEP_MULTIPLIER = 2; // Increased from 1.5 for longer transitions
    const adjustedTotal = totalSteps * STEP_MULTIPLIER;
    
    // Use the scroll position within the section container
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    })
    
    // Track if we've scrolled past the first card
    const [hasScrolledPastFirst, setHasScrolledPastFirst] = useState(false)
    
    // Track current step based on scroll position
    const [currentStep, setCurrentStep] = useState(0)
    
    // Track if the section is in view
    const [isInView, setIsInView] = useState(false)
    
    // Track if we've reached the end of the section
    const [hasReachedEnd, setHasReachedEnd] = useState(false)
    
    // Track if the page has loaded
    const [isLoaded, setIsLoaded] = useState(false)
    
    // Track if we're transitioning to the next section
    const [isTransitioningToNextSection, setIsTransitioningToNextSection] = useState(false)
    
    // Add this state and ref at the top of the GamifiedJourney function
    const [currentMobileStep, setCurrentMobileStep] = useState(0);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    
    // Pre-calculate all the transforms for each stack card to avoid conditional hook calls
    const stackCards = steps.slice(1); // Get only the stack cards
    const stepTransforms = stackCards.map((_, index) => {
        // Increase spacing between transitions for longer visibility
        const startPoint = (index * 1.8) / adjustedTotal; // More space between transitions
        const endPoint = ((index + 1.8) * 1.8) / adjustedTotal;
        
        // Calculate opacity with extended visibility windows
        const opacity = useTransform(
            scrollYProgress,
            [
                Math.max(0, startPoint - 0.1),
                startPoint + 0.1,
                endPoint - 0.3, // Extended visible period
                endPoint - 0.15  // Slower fade out
            ],
            [0, 1, 1, 0]
        );
        
        // Scale transform with gentler transitions
        const scale = useTransform(
            scrollYProgress,
            [
                Math.max(0, startPoint - 0.1),
                startPoint + 0.1,
                endPoint - 0.3,
                endPoint - 0.15
            ],
            [0.97, 1, 1, 0.97]
        );
        
        // Y-offset transform with smoother movement
        const y = useTransform(
            scrollYProgress,
            [
                Math.max(0, startPoint - 0.1),
                startPoint + 0.1,
                endPoint - 0.3,
                endPoint - 0.15
            ],
            [25, 0, 0, -25]
        );
        
        return { opacity, scale, y };
    });
    
    // Calculate progress for the indicator - used by all steps
    const progressHeight = useTransform(
        scrollYProgress,
        [0, 0.95],
        ["0%", "100%"]
    );
    
    // Create a transform for the scroll indicator
    const scrollIndicatorOpacity = useTransform(
                scrollYProgress,
        [0, 0.1, 0.7, 0.8], 
        [1, 0, 0, 0]
    );
    
    // Create a transform for the transition to next section
    const nextSectionTransition = useTransform(
                scrollYProgress,
        [0.9, 0.95, 1],
        [0, 0, 1]
    );
    
    // Set page as loaded after a short delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 300);
        
        return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => {
        // Function to check if section is in viewport and if we've scrolled past first card
        const checkScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect()
                const isCurrentlyInView = rect.top <= window.innerHeight && rect.bottom >= 0
                
                // Adjusted threshold for first card transition
                const scrolledPastFirst = window.scrollY > (sectionRef.current.offsetTop + window.innerHeight * 0.4)
                setHasScrolledPastFirst(scrolledPastFirst)
                
                if (isCurrentlyInView) {
                    setIsInView(true)
                } else if (!isCurrentlyInView) {
                    setIsInView(false)
                }
            }
        }
        
        // Check initially
        checkScroll()
        
        // Add scroll event listener
        window.addEventListener('scroll', checkScroll)
        
        // Cleanup
        return () => window.removeEventListener('scroll', checkScroll)
    }, [])
    
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            // Calculate step based on adjusted scroll progress
            if (!hasScrolledPastFirst) {
                setCurrentStep(0);
            } else {
                // Calculate current step with smoother transitions
                const normalizedProgress = Math.max(0, Math.min(1, latest));
                const stepProgress = normalizedProgress * adjustedTotal / 1.8; // Adjusted for longer transitions
                const currentStackStep = Math.min(
                    totalSteps,
                    Math.floor(stepProgress)
                );
                setCurrentStep(currentStackStep);
            }
            
            // Adjusted end threshold for smoother section transition
            if (latest > 0.9) { // Increased from 0.85 for later transition
                setHasReachedEnd(true);
                setIsTransitioningToNextSection(true);
            } else {
                setHasReachedEnd(false);
                setIsTransitioningToNextSection(false);
            }
        });
        
        return () => unsubscribe();
    }, [scrollYProgress, hasScrolledPastFirst, adjustedTotal]);
    
    // Handle automatic scroll to next section when reaching the end
    useEffect(() => {
        if (hasReachedEnd && sectionRef.current) {
            // Create a smooth transition to the next section
            const handleTransition = () => {
                if (sectionRef.current && window.scrollY >= sectionRef.current.offsetTop + sectionRef.current.offsetHeight - window.innerHeight) {
                    // We're at the end of this section, find and scroll to the next one
                    const nextSection = sectionRef.current.nextElementSibling as HTMLElement;
                    if (nextSection) {
                        // Use a smoother transition
                        window.scrollTo({
                            top: nextSection.offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // Remove the event listener once we've scrolled
                        window.removeEventListener('scroll', handleTransition);
                    }
                }
            };
            
            window.addEventListener('scroll', handleTransition);
            return () => window.removeEventListener('scroll', handleTransition);
        }
    }, [hasReachedEnd]);

    // Orange button style
    const orangeButtonStyle = {
        backgroundColor: "#FF6B00",
        borderColor: "#FF6B00",
        color: "white",
        hover: "bg-orange-600"
    };

    // Update container height for longer scroll distance
    const containerHeight = `${(steps.length - 1) * 180}vh`; // Increased for longer transitions

    // Handler to update current step on scroll
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollLeft = e.currentTarget.scrollLeft;
        const cardWidth = cardRefs.current[0]?.offsetWidth || 1;
        const idx = Math.round(scrollLeft / cardWidth);
        setCurrentMobileStep(idx);
    };

    return (
        <section 
            ref={sectionRef}
            className="relative"
            style={{ 
                minHeight: '200vh',
                backgroundColor: "#f8f1e9", // Changed to match the design
                visibility: isLoaded ? 'visible' : 'hidden',
            }}
        >
            {/* Static First Card */}
            <div 
                className="sticky top-0 left-0 w-full h-screen"
                style={{
                    opacity: hasScrolledPastFirst ? 0 : 1,
                    transition: 'all 0.5s ease-in-out',
                    pointerEvents: hasScrolledPastFirst ? 'none' : 'auto',
                    zIndex: hasScrolledPastFirst ? -1 : 20,
                    position: 'sticky',
                }}
            >
                <div className="h-full flex flex-col">
                    {/* Mobile layout for all steps as horizontal scrollable cards */}
                    <div className="block md:hidden w-full pt-8">
                        {/* Horizontal scrollable cards */}
                        <div
                            className="flex flex-row overflow-x-auto snap-x snap-mandatory w-full scrollbar-hide"
                            onScroll={handleScroll}
                            style={{ scrollSnapType: 'x mandatory' }}
                        >
                            {steps.map((step, idx) => (
                                <div
                                    key={idx}
                                    ref={el => { cardRefs.current[idx] = el; }}
                                    className="w-full min-w-full snap-center flex flex-col items-center pb-6 bg-transparent"
                                    style={{ background: 'transparent', height: 'calc(100vh - 80px)' }}
                                >
                                    <div className="flex flex-col h-full overflow-y-auto">
                                        {/* Main image only, larger size */}
                                        <div className="relative w-full max-w-[370px] aspect-[1/1] mx-auto mb-4 rounded-2xl overflow-hidden">
                                            <Image
                                              src={
                                                idx === 0 ? "/images/setUpYourMission.png" :
                                                idx === 1 ? "/images/dailyQuest.png" :
                                                idx === 2 ? "/images/celebrateAchievement.png" :
                                                idx === 3 ? "/images/joinConnect.png" :
                                                step.imageUrl
                                              }
                                              alt={step.title}
                                              fill
                                              className="object-cover rounded-2xl"
                                              priority={idx === 0}
                                            />
                                        </div>
                                        <div className="flex items-center justify-center mt-2 mb-4">
                                          {steps.map((step, idx) => (
                                            <div key={idx} className="flex items-center">
                                              <div className={`w-7 h-7 flex items-center justify-center rounded-full ${currentMobileStep === idx ? 'bg-[#6B46C1] text-white' : 'bg-gray-200 text-gray-500'} font-bold text-sm`}>
                                                {step.number}
                                              </div>
                                              {idx < steps.length - 1 && (
                                                <div className="w-8 h-1 bg-gray-300 mx-1 rounded-full" />
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                        {/* Text content below, more compact and readable */}
                                        <div className="px-4 text-left flex flex-col flex-1 justify-between">
                                          <p className="text-xs text-gray-600 mb-1">How to work</p>
                                          <h3 className="text-2xl font-normal m-0 text-[#333333] leading-[1]" style={{ fontFamily: "'Playfair Display', serif" }}>
                                            {step.title.split(' ').slice(0, -1).join(' ')}
                                          </h3>
                                          <h3 className="text-xl font-serif italic m-0 text-[#333333] leading-[1]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: "bold" }}>
                                            {step.subtitle}
                                          </h3>
                                          <p className="text-base mb-4 leading-relaxed text-[#333333]" style={{ fontFamily: "'Roboto', sans-serif", fontSize: "1rem", lineHeight: "1.5" }}>
                                            {step.description}
                                          </p>
                                          <Link href="/find-coach">
                                            <button 
                                              className="rounded-full px-8 py-2 text-base text-white hover:bg-[#e65a00] transition-all duration-300 flex items-center"
                                              style={{ 
                                                backgroundColor: "#ff6a00",
                                                border: "none",
                                                padding: "0.75rem 1.5rem",
                                                fontSize: "1rem",
                                                cursor: "pointer",
                                              }}
                                            >
                                              Know more
                                              <motion.div
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                                className="ml-2"
                                              >
                                                <ArrowRight className="h-5 w-5" />
                                              </motion.div>
                                            </button>
                                          </Link>
                                        </div>                                    
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Main content area for first card (desktop) */}
                    <div className="flex-1 flex items-center justify-center hidden md:flex">
                        <div className="w-full mx-auto flex justify-center items-center gap-8 px-8" style={{ background: "transparent" }}>
                            {/* Left content - Text and button with scroll bar */}
                            <div className="flex" style={{ marginRight: "50px" }}>
                                {/* Scroll bar indicator on the left */}
                                <div className="relative mr-6 flex flex-col items-center">
                                    {/* Step 1 - Always highlighted on first static card */}
                                    <motion.div 
                                        className="flex items-center justify-center rounded-full"
                                        animate={{ 
                                            width: '2.5rem',
                                            height: '2.5rem',
                                            backgroundColor: '#6B46C1'
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <span className="text-sm font-medium text-white">01</span>
                                    </motion.div>
                                    
                                    <div className="h-20 w-0.5 bg-gray-200 my-2 relative">
                                        <motion.div 
                                            className="absolute top-0 left-0 w-full bg-[#6B46C1]" 
                                            animate={{ height: "35%" }}
                                            transition={{ duration: 0.5 }}
                                        ></motion.div>
                                    </div>
                                    
                                    {/* Step 2 - Show as dot on first card */}
                                    <motion.div 
                                        className="flex items-center justify-center rounded-full"
                                        animate={{ 
                                            width: '0.5rem',
                                            height: '0.5rem',
                                            backgroundColor: '#D1D5DB'
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                    </motion.div>
                                    
                                    <div className="h-20 w-0.5 bg-gray-200 my-2 relative">
                                        <motion.div 
                                            className="absolute top-0 left-0 w-full bg-[#6B46C1]" 
                                            animate={{ height: "0%" }}
                                            transition={{ duration: 0.5 }}
                                        ></motion.div>
                                    </div>
                                    
                                    {/* Step 3 - Show as dot on first card */}
                                    <motion.div 
                                        className="flex items-center justify-center rounded-full"
                                        animate={{ 
                                            width: '0.5rem',
                                            height: '0.5rem',
                                            backgroundColor: '#D1D5DB'
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                    </motion.div>
                                    
                                    <div className="h-20 w-0.5 bg-gray-200 my-2 relative">
                                        <motion.div 
                                            className="absolute top-0 left-0 w-full bg-[#6B46C1]" 
                                            animate={{ height: "0%" }}
                                            transition={{ duration: 0.5 }}
                                        ></motion.div>
                                    </div>
                                    
                                    {/* Step 4 - Show as dot on first card */}
                                    <motion.div 
                                        className="flex items-center justify-center rounded-full"
                                        animate={{ 
                                            width: '0.5rem',
                                            height: '0.5rem',
                                            backgroundColor: '#D1D5DB'
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                    </motion.div>
                                    
                                    <div className="h-10 w-0.5 bg-gray-200 my-2 relative">
                                        <motion.div 
                                            className="absolute top-0 left-0 w-full bg-[#6B46C1]" 
                                            animate={{ height: "0%" }}
                                            transition={{ duration: 0.5 }}
                                        ></motion.div>
                                    </div>
                                </div>

                                {/* Text content constrained to 422×377 */}
                                <div className="flex flex-col justify-center" style={{width: "422px", height: "377px"}}>
                <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <p className="text-sm text-gray-600 mb-2">How to work</p>
                                        
                                        <h3 className="text-5xl font-normal mb-2 text-[#333333]" style={{ fontFamily: "'Playfair Display', serif" }}>
                                            Set up your
                                        </h3>
                                        <h3 className="text-5xl font-serif italic mb-6 text-[#333333]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: "bold" }}>
                                            Mission
                                        </h3>
                                        
                                        <p className="text-lg mb-8 leading-relaxed text-[#333333]" style={{ fontFamily: "'Roboto', sans-serif", fontSize: "1rem", lineHeight: "1.5" }}>
                                            Unlock your potential with our AI-powered coach matching service. Whether advancing your career or achieving personal growth, our AI ensures you get paired with the ideal coach for your unique needs and goals.
                                        </p>
                                        
                                        <Link href="/find-coach">
                                            <button 
                                                className="rounded-full px-8 py-2 text-base text-white hover:bg-[#e65a00] transition-all duration-300 flex items-center"
                                                style={{ 
                                                    backgroundColor: "#ff6a00",
                                                    border: "none",
                                                    padding: "0.75rem 1.5rem",
                                                    fontSize: "1rem",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Know more
                                                <motion.div
                                                    animate={{ x: [0, 5, 0] }}
                                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                                    className="ml-2"
                                                >
                                                    <ArrowRight className="h-5 w-5" />
                                                </motion.div>
                                            </button>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                            
                            {/* Right content - Image and overlays */}
                            <div className="relative" style={{ 
                                width: "586px", 
                                height: "586px", 
                                overflow: "visible"
                            }}>
                                {/* Background image - base layer with rounded corners */}
                                <motion.div
                                    className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.7 }}
                                    style={{ zIndex: 1 }}
                                >
                                    <Image
                                        src="/images/setUpYourMission.png"
                                        alt="Professional woman working"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stack Cards Wrapper (desktop only) */}
            <div 
                className="relative hidden md:block"
                style={{ 
                    height: containerHeight,
                    marginTop: '0',
                }}
            >
                {/* Stack Cards Container */}
                <div 
                    ref={containerRef}
                    className="sticky top-0 left-0 w-full h-screen"
                    style={{
                        visibility: 'visible',
                        opacity: hasScrolledPastFirst ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out',
                        zIndex: hasScrolledPastFirst ? 30 : -1,
                    }}
                >
                    {/* Render stack cards */}
                    {stackCards.map((step, idx) => (
                        <div 
                            key={idx}
                            className="absolute top-0 left-0 w-full h-screen"
                            style={{ 
                                zIndex: currentStep === idx ? stackCards.length + 1 : stackCards.length - idx,
                                visibility: isLoaded ? 'visible' : 'hidden',
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 w-full h-full"
                                style={{
                                    opacity: stepTransforms[idx].opacity,
                                    scale: stepTransforms[idx].scale,
                                    y: stepTransforms[idx].y,
                                    backgroundColor: 'transparent',
                                    pointerEvents: currentStep === idx ? 'auto' : 'none',
                                }}
                            >
                                <div className="h-full flex flex-col">
                                    {/* Debug indicator for step tracking - can be removed in production */}
                                    <div className="absolute top-2 right-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded-md hidden">
                                        Step: {currentStep+1}, Index: {idx}
                                    </div>
                                    {/* Main content area for stack cards */}
                                    <div className="flex-1 flex items-center justify-center">
                                        <div className="w-full mx-auto flex justify-center items-center gap-8 px-8" style={{ background: "transparent" }}>
                                            {/* Left content - Text and button with scroll bar */}
                                            <div className="flex" style={{ marginRight: "50px" }}>
                                                {/* Scroll bar indicator on the left */}
                                                <div className="relative mr-6 flex flex-col items-center">
                                                    {/* Step 1 - Small purple dot on stack cards */}
                                                        <motion.div
                                                        className="flex items-center justify-center rounded-full"
                                                            animate={{
                                                            width: '0.5rem',
                                                            height: '0.5rem',
                                                            backgroundColor: '#6B46C1'
                                                        }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        {/* No number shown as this is for step 1 */}
                                                        </motion.div>
                                                    
                                                    <div className="h-20 w-0.5 bg-gray-200 my-2 relative">
                                                        <motion.div 
                                                            className="absolute top-0 left-0 w-full bg-[#6B46C1]" 
                                                            animate={{ height: "100%" }}
                                                            transition={{ duration: 0.5 }}
                                                        ></motion.div>
                                                    </div>
                                                    
                                                    {/* Step 2 - Active on first stack card */}
                                                    <motion.div 
                                                        className="flex items-center justify-center rounded-full"
                                                        animate={{ 
                                                            width: idx === 0 ? '2.5rem' : '0.5rem',
                                                            height: idx === 0 ? '2.5rem' : '0.5rem',
                                                            backgroundColor: '#6B46C1'
                                                        }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        {idx === 0 && <span className="text-sm font-medium text-white">02</span>}
                                                    </motion.div>
                                                    
                                                    <div className="h-20 w-0.5 bg-gray-200 my-2 relative">
                                                        <motion.div 
                                                            className="absolute top-0 left-0 w-full bg-[#6B46C1]" 
                                                            animate={{ height: idx >= 1 ? "100%" : "35%" }}
                                                            transition={{ duration: 0.5 }}
                                                        ></motion.div>
                                                    </div>
                                                    
                                                    {/* Step 3 - Active on second stack card */}
                                                    <motion.div 
                                                        className="flex items-center justify-center rounded-full"
                                                        animate={{ 
                                                            width: idx === 1 ? '2.5rem' : '0.5rem',
                                                            height: idx === 1 ? '2.5rem' : '0.5rem',
                                                            backgroundColor: idx >= 1 ? '#6B46C1' : '#D1D5DB'
                                                        }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        {idx === 1 && <span className="text-sm font-medium text-white">03</span>}
                                                </motion.div>

                                                    <div className="h-20 w-0.5 bg-gray-200 my-2 relative">
                                                <motion.div
                                                            className="absolute top-0 left-0 w-full bg-[#6B46C1]" 
                                                            animate={{ height: idx >= 2 ? "100%" : "0%" }}
                                                            transition={{ duration: 0.5 }}
                                                        ></motion.div>
                                                    </div>
                                                    
                                                    {/* Step 4 - Active on third stack card */}
                                                    <motion.div 
                                                        className="flex items-center justify-center rounded-full"
                                                        animate={{ 
                                                            width: idx === 2 ? '2.5rem' : '0.5rem',
                                                            height: idx === 2 ? '2.5rem' : '0.5rem',
                                                            backgroundColor: idx >= 2 ? '#6B46C1' : '#D1D5DB'
                                                        }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        {idx === 2 && <span className="text-sm font-medium text-white">04</span>}
                                                </motion.div>

                                                    <div className="h-10 w-0.5 bg-gray-200 my-2 relative">
                                                        <motion.div 
                                                            className="absolute top-0 left-0 w-full bg-[#6B46C1]" 
                                                            animate={{ height: idx >= 3 ? "100%" : "0%" }}
                                                            transition={{ duration: 0.5 }}
                                                        ></motion.div>
                                                    </div>
                                                </div>

                                                {/* Text content constrained to 422×377 */}
                                                <div className="flex flex-col justify-center" style={{width: "422px", height: "377px"}}>
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <p className="text-sm text-gray-600 mb-2">How to work</p>
                                                        
                                                        <h3 className="text-5xl font-normal mb-2 text-[#333333]" style={{ fontFamily: "'Playfair Display', serif" }}>
                                                            {step.title.split(' ').slice(0, -1).join(' ')}
                                                        </h3>
                                                        <h3 className="text-5xl font-serif italic mb-6 text-[#333333]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: "bold" }}>
                                                            {step.subtitle}
                                                        </h3>
                                                        
                                                        <p className="text-lg mb-8 leading-relaxed text-[#333333]" style={{ fontFamily: "'Roboto', sans-serif", fontSize: "1rem", lineHeight: "1.5" }}>
                                                            {step.description}
                                                        </p>
                                                        
                                                        <Link href="/find-coach">
                                                            <button 
                                                                className="rounded-full px-8 py-2 text-base text-white hover:bg-[#e65a00] transition-all duration-300 flex items-center"
                                                                style={{ 
                                                                    backgroundColor: "#ff6a00",
                                                                    border: "none",
                                                                    padding: "0.75rem 1.5rem",
                                                                    fontSize: "1rem",
                                                                    cursor: "pointer",
                                                                }}
                                                            >
                                                                Know more
                                                                <motion.div
                                                                    animate={{ x: [0, 5, 0] }}
                                                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                                                    className="ml-2"
                                                                >
                                                                    <ArrowRight className="h-5 w-5" />
                                                                </motion.div>
                                                            </button>
                                                        </Link>
                                                    </motion.div>
                                                </div>
                                            </div>
                                            
                                            {/* Right content - Graphics for Daily Quests */}
                                            <div className="relative" style={{ 
                                                width: "586px", 
                                                height: "586px", 
                                                overflow: "visible"
                                            }}>
                                                {/* Background image */}
                                                <motion.div
                                                    className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.7 }}
                                                    style={{ zIndex: 1 }}
                                                >
                                                    <Image
                                                        src={
                                                            idx === 0 ? '/images/dailyQuest.png' :
                                                            idx === 1 ? '/images/celebrateAchievement.png' :
                                                            idx === 2 ? '/images/joinConnect.png' :
                                                            step.imageUrl
                                                        }
                                                        alt={idx === 0 ? "Daily Quest background" : idx === 1 ? "Celebrate Achievements background" : idx === 2 ? "Join Communities background" : step.title}
                                                        fill
                                                        className="object-cover"
                                                        priority
                                                    />
                                                </motion.div>
                                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}