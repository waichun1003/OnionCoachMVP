"use client"

import { motion } from "framer-motion"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "How does the coach matching process work?",
        answer: "Our matching system analyzes your industry, budget, and language preferences to connect you with the ideal coach for your journey. Simply complete a brief form, and we will recommend coaches who are the perfect fit based on your needs. You can then review coach profiles, schedule a free coaching session for up to 3 coaches, and select the coach you feel most aligned with."
    },
    {
        question: "How to schedule the first coaching session?",
        answer: "After selecting your preferred coach, you can easily schedule your first session through our online booking system. Choose a time that works best for you from your coach's available slots, and you'll receive immediate confirmation along with preparation materials for your first session."
    },
    {
        question: "Can I change coaches after my first coaching session?",
        answer: "Yes, absolutely! We understand that finding the right coach-client fit is crucial. If you feel that your current coach isn't the best match after your first session, you can request a change, and we'll help you find another coach who better suits your needs and preferences."
    },
    {
        question: "How much do coaching sessions typically cost on your platform?",
        answer: "Our coaching session rates vary based on the coach's experience level and expertise. We offer different pricing tiers to accommodate various budgets, typically ranging from $100 to $300 per session. Many coaches also offer package deals for multiple sessions at discounted rates."
    }
]

export function FAQSection() {
    return (
        <section className="py-24 bg-[#EDE6DC] relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Decorative Grid Elements */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-4 pointer-events-none">
                    {/* Top Left Box */}
                    <motion.div
                        className="col-start-1 col-span-2 row-start-1 row-span-2 bg-[#FFB541] rounded-3xl opacity-20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 0.2, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    />

                    {/* Middle Right Box */}
                    <motion.div
                        className="col-start-5 col-span-2 row-start-3 row-span-2 bg-[#664EC9] rounded-3xl opacity-20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 0.2, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    />

                    {/* Bottom Left Box */}
                    <motion.div
                        className="col-start-2 col-span-2 row-start-5 row-span-2 bg-[#067169] rounded-3xl opacity-20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 0.2, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <motion.div
                        className="max-w-3xl mx-auto text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-normal mb-4">
                            Frequently Asked{" "}
                            <span className="italic font-serif">Question.</span>
                        </h2>
                        <p className="text-lg text-gray-600">
                            Navigating the world of coaching can be daunting, but we're here to make the process simple and stress-free. If you don't find the answer you're looking for, don't hesitate to reach out to our support team
                        </p>
                    </motion.div>

                    <motion.div
                        className="max-w-3xl mx-auto backdrop-blur-sm bg-white/50 p-8 rounded-3xl shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Accordion type="single" collapsible defaultValue="item-0">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border-b border-gray-200 last:border-b-0"
                                >
                                    <AccordionTrigger className="text-left text-lg font-seminormal hover:no-underline">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-600">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

