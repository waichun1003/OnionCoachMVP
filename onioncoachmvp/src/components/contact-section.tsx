"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Mail, Users, Calendar, Star, Loader2 } from 'lucide-react'
import { toast } from "sonner"

export function ContactSection() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        try {
            // Here you would typically make an API call to your backend
            // For now, we'll simulate an API call with a timeout
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            // Show success message
            toast.success("Thank you for subscribing! We'll keep you updated.", {
                description: "Check your inbox for further updates!",
                duration: 5000,
            })
            
            // Clear the input
            setEmail("")
        } catch (error) {
            // Show error message
            toast.error("Oops! Something went wrong.", {
                description: "Please try again later.",
                duration: 5000,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const circleVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <section className="py-24 bg-[#6B46C1] relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-white"
                        >
                            <h2 className="text-4xl md:text-5xl font-normal mb-4">
                                Stay contact{" "}
                                <span className="italic font-serif">with us.</span>
                            </h2>
                            <p className="text-xl text-white/90 mb-8">
                                Onion Coach is currently in beta, and we welcome your feedback and suggestions.
                            </p>
                            <form onSubmit={handleSubmit} className="relative max-w-md">
                                <Input
                                    type="email"
                                    placeholder="leave your email here"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-14 pl-6 pr-32 rounded-full bg-white text-gray-900 placeholder:text-gray-500"
                                    required
                                    disabled={isSubmitting}
                                />
                                <Button
                                    type="submit"
                                    className="absolute right-2 top-2 rounded-full bg-[#F36C49] hover:bg-[#E55D3A] h-10"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Submit
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </Button>
                            </form>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-white/70 mt-4"
                            >
                                By subscribing, you'll receive updates about new features, coaching tips, and exclusive content.
                            </motion.p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-2 gap-4 relative h-[400px]"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.div
                                className="w-full h-full bg-white rounded-full opacity-90 flex flex-col items-center justify-center p-4"
                                variants={circleVariants}
                            >
                                <Mail className="w-12 h-12 text-[#6B46C1] mb-2" />
                                <p className="text-[#6B46C1] text-center font-seminormal">Stay Updated</p>
                                <p className="text-[#6B46C1] text-center text-sm">Get the latest coaching tips</p>
                            </motion.div>
                            <motion.div
                                className="w-3/4 h-3/4 bg-[#F36C49] rounded-full opacity-90 justify-self-end self-end flex flex-col items-center justify-center p-4"
                                variants={circleVariants}
                            >
                                <Users className="w-10 h-10 text-white mb-2" />
                                <p className="text-white text-center font-seminormal">Community</p>
                                <p className="text-white text-center text-xs">Connect with peers</p>
                            </motion.div>
                            <motion.div
                                className="w-2/3 h-2/3 bg-[#F36C49] rounded-full opacity-90 justify-self-start self-end flex flex-col items-center justify-center p-4"
                                variants={circleVariants}
                            >
                                <Calendar className="w-8 h-8 text-white mb-2" />
                                <p className="text-white text-center font-seminormal">Events</p>
                                <p className="text-white text-center text-xs">Join our webinars</p>
                            </motion.div>
                            <motion.div
                                className="w-full h-full bg-white rounded-full opacity-90 flex flex-col items-center justify-center p-4"
                                variants={circleVariants}
                            >
                                <Star className="w-12 h-12 text-[#6B46C1] mb-2" />
                                <p className="text-[#6B46C1] text-center font-seminormal">Premium Content</p>
                                <p className="text-[#6B46C1] text-center text-sm">Exclusive resources</p>
                            </motion.div>
                            <motion.div
                                className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white rounded-full opacity-40 flex items-center justify-center"
                                animate={{
                                    y: [0, -20, 0],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                            >
                                <Mail className="w-12 h-12 text-[#6B46C1]" />
                            </motion.div>
                            <motion.div
                                className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-[#F36C49] rounded-full opacity-40 flex items-center justify-center"
                                animate={{
                                    y: [0, 20, 0],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: 1,
                                }}
                            >
                                <Users className="w-8 h-8 text-white" />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

