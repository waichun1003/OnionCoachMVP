"use client"

import React from 'react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// @ts-ignore
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const coachingData = [
    { month: 'Jan', sessions: 65 },
    { month: 'Feb', sessions: 75 },
    { month: 'Mar', sessions: 85 },
    { month: 'Apr', sessions: 95 },
    { month: 'May', sessions: 110 },
    { month: 'Jun', sessions: 125 },
]

const testimonials = [
    {
        name: "Alex Chen",
        role: "Software Engineer",
        content: "The coaching sessions have been transformative for my career. I've gained clarity and confidence in my professional journey.",
        avatar: "/images/coach3.jpeg"
    },
    {
        name: "Sarah Miller",
        role: "Marketing Director",
        content: "My coach helped me identify and overcome barriers I didn't even know existed. The results have been incredible.",
        avatar: "/images/coach2.jpeg"
    }
]

const faqs = [
    {
        question: "What does the coaching process look like?",
        answer: "Our coaching process is personalized to your needs, typically starting with an initial consultation to understand your goals. We then match you with the perfect coach and begin regular sessions focused on your development."
    },
    {
        question: "How is Coaching different from therapy?",
        answer: "While therapy often focuses on healing past trauma, coaching is future-oriented and action-focused, helping you achieve specific personal or professional goals."
    },
    {
        question: "What can I expect from my first coaching session?",
        answer: "Your first session will be about establishing rpublicort with your coach, clarifying your goals, and creating an initial action plan for your development journey."
    }
]

export function Coaching() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-purple-100 dark:bg-purple-950 py-20 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="container mx-auto px-4"
                >
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-normal mb-6 bg-gradient-to-r from-purple-600 to-orange-500 text-transparent bg-clip-text">
                            Coaching for your next breakthrough
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            Discover clarity, achieve growth, and unlock your full potential with our expert coaches
                        </p>
                        <Button size="lg" className="bg-[#6B46C1] hover:bg-purple-700">
                            Get Started Today
                        </Button>
                    </div>

                    <div className="flex justify-center gap-4 mt-12">
                        {[1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Avatar className="w-16 h-16 border-2 border-white">
                                    <AvatarImage src={`/placeholder.svg?text=Coach${i}`} alt={`Coach ${i}`} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-orange-400 rounded-full filter blur-3xl opacity-20" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-400 rounded-full filter blur-3xl opacity-20" />
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-normal mb-4">Find your perfect coach through our matching</h2>
                        <p className="text-gray-600 dark:text-gray-300">Simple steps to start your coaching journey</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Complete Profile",
                                description: "Tell us about your goals and preferences"
                            },
                            {
                                title: "Match with Coaches",
                                description: "We'll connect you with compatible coaches"
                            },
                            {
                                title: "Begin Journey",
                                description: "Start your transformation with expert guidance"
                            }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                            >
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="text-4xl font-normal text-purple-600 mb-4">{i + 1}</div>
                                        <h3 className="text-xl font-seminormal mb-2">{step.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-purple-50 dark:bg-purple-900">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl font-normal text-center mb-8">Our Impact in Numbers</h2>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={coachingData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="sessions"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={2}
                                        dot={{ fill: "hsl(var(--primary))" }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-normal text-center mb-12">Our coaches truly understand your needs</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.2 }}
                            >
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center mb-4">
                                            <Avatar className="mr-4">
                                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                                <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-seminormal">{testimonial.name}</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300">{testimonial.content}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-normal text-center mb-12">Frequently Asked Questions</h2>
                    <div className="max-w-3xl mx-auto">
                        <Accordion type="single" collapsible>
                            {faqs.map((faq, i) => (
                                <AccordionItem key={i} value={`item-${i}`}>
                                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                                    <AccordionContent>{faq.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-[#6B46C1] text-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-3xl font-normal mb-6">Stay in contact with us</h2>
                        <p className="mb-8">Join our newsletter to get the latest updates and offers</p>
                        <div className="flex gap-4 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white text-gray-900"
                            />
                            <Button variant="secondary">Subscribe</Button>
                        </div>
                    </div>
                </div>

                {/* Decorative Shapes */}
                <div className="absolute top-0 left-0 w-full h-full -z-0">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full opacity-50" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 rounded-full opacity-50" />
                </div>
            </section>
        </div>
    )
}

