"use client"

import { motion } from "framer-motion"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDown } from "lucide-react"

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
        <section className="py-24 bg-[#F5F0E8]">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-normal mb-4">
                            Frequently Asked{" "}
                            <span className="italic">Question.</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Navigating the world of coaching can be daunting, but we're here to make the process simple and stress-free. If you don't find the answer you're looking for, don't hesitate to reach out to our support team
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="max-w-4xl mx-auto space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Accordion type="single" collapsible>
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="mb-4 bg-white rounded-xl overflow-hidden"
                            >
                                <AccordionTrigger className="px-6 py-5 text-left text-lg hover:no-underline w-full flex justify-between items-center data-[state=open]>[data-chevron]:rotate-180">
                                    <span className="font-normal text-gray-900">{faq.question}</span>
                                    <ChevronDown data-chevron className="h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200" />
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-5 text-gray-600">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    )
}

