"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import Image from "next/image"
import { useModal } from "@/components/ui/modal-context"

interface NavBarProps {
    className?: string;
}

export function NavBar({ className = "" }: NavBarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const { modalOpen } = useModal();

    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }
            setLastScrollY(currentScrollY)
        }
        window.addEventListener('scroll', controlNavbar)
        return () => {
            window.removeEventListener('scroll', controlNavbar)
        }
    }, [lastScrollY])

    if (modalOpen) {
        return null;
    }

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 ${className}`}
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3 }}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="bg-white/80 backdrop-blur-lg rounded-full mt-4 shadow-md">
                    <div className="flex h-16 items-center justify-between px-6">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-2">
                                <Image
                                    src="/images/logo.jpeg"
                                    alt="Onion Logo"
                                    width={120}
                                    height={40}
                                    priority
                                    className="h-auto w-[120px]"
                                />
                            </Link>
                        </div>
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link 
                                href="/find-coach" 
                                className="text-gray-600 hover:text-purple-600 font-medium hover:shadow-md hover:underline decoration-purple-600 decoration-2 underline-offset-4 transition-all"
                            >
                                Find Your Coach
                            </Link>
                            {/* <Link 
                                href="/pricing" 
                                className="text-gray-600 hover:text-purple-600 font-medium hover:shadow-md hover:underline decoration-purple-600 decoration-2 underline-offset-4 transition-all"
                            >
                                Pricing
                            </Link> */}
                            <Link 
                                href="/campaign" 
                                className="text-gray-600 hover:text-purple-600 font-medium hover:shadow-md hover:underline decoration-purple-600 decoration-2 underline-offset-4 transition-all"
                            >
                                Campaign
                            </Link>
                            <Link 
                                href="/about" 
                                className="text-gray-600 hover:text-purple-600 font-medium hover:shadow-md hover:underline decoration-purple-600 decoration-2 underline-offset-4 transition-all"
                            >
                                About Us
                            </Link>
                        </nav>
                        <div className="hidden md:flex items-center space-x-4">
                            <Button 
                                className="rounded-full bg-[#6B46C1] hover:bg-purple-700 font-medium" 
                                asChild
                            >
                                <Link href="/register">Get Started</Link>
                            </Button>
                        </div>
                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="relative z-50"
                                aria-label="Open menu"
                            >
                                <AnimatePresence>
                                    {isMenuOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ opacity: 0, rotate: -90 }}
                                            animate={{ opacity: 1, rotate: 0 }}
                                            exit={{ opacity: 0, rotate: 90 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <X className="h-6 w-6 text-[#7C3AED]" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ opacity: 0, rotate: 90 }}
                                            animate={{ opacity: 1, rotate: 0 }}
                                            exit={{ opacity: 0, rotate: -90 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Menu className="h-6 w-6 text-[#7C3AED]" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Mobile menu overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                                onClick={() => setIsMenuOpen(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="fixed top-0 left-0 bottom-0 w-full max-w-xs bg-white z-40 p-6 overflow-y-auto"
                            >
                                <div className="flex flex-col min-h-full">
                                    <div className="flex items-center space-x-2 mb-8">
                                        <Image
                                            src="/images/logo.jpeg"
                                            alt="Onion Logo"
                                            width={120}
                                            height={40}
                                            priority
                                            className="h-auto w-[120px]"
                                        />
                                    </div>
                                    <nav className="flex-1 space-y-6">
                                        <Link
                                            href="/find-coach"
                                            className="block text-2xl font-medium text-gray-900 hover:text-purple-600 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Find Your Coach
                                        </Link>
                                        {/* <Link
                                            href="/pricing"
                                            className="block text-2xl font-medium text-gray-900 hover:text-purple-600 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Pricing
                                        </Link> */}
                                        <Link
                                            href="/campaign"
                                            className="block text-2xl font-medium text-gray-900 hover:text-purple-600 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Campaign
                                        </Link>
                                        <Link
                                            href="/about"
                                            className="block text-2xl font-medium text-gray-900 hover:text-purple-600 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            About Us
                                        </Link>
                                    </nav>
                                    <div className="mt-6">
                                        <Button 
                                            className="w-full rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] font-medium"
                                            onClick={() => setIsMenuOpen(false)}
                                            asChild
                                        >
                                            <Link href="/register">
                                                Get Started
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    )
}
