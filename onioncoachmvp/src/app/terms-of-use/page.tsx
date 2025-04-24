"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsOfUse() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using Onion Coach, you agree to these Terms of Use",
        "You must be at least 18 years old to use our services",
        "You are responsible for maintaining the confidentiality of your account",
        "We reserve the right to modify these terms at any time"
      ]
    },
    {
      title: "User Responsibilities",
      content: [
        "Provide accurate and complete information when creating an account",
        "Maintain the confidentiality of your login credentials",
        "Use the platform in compliance with all applicable laws",
        "Respect the intellectual property rights of others"
      ]
    },
    {
      title: "Coaching Services",
      content: [
        "Coaches are independent contractors, not employees of Onion Coach",
        "We do not guarantee specific results from coaching sessions",
        "Sessions must be scheduled and canceled according to our policies",
        "Payment is required before coaching sessions begin"
      ]
    },
    {
      title: "Intellectual Property",
      content: [
        "All platform content is protected by copyright and other IP laws",
        "You may not copy, modify, or distribute our content without permission",
        "You retain ownership of your personal content shared on the platform",
        "You grant us a license to use your feedback and testimonials"
      ]
    },
    {
      title: "Limitation of Liability",
      content: [
        "We provide the platform 'as is' without any warranties",
        "We are not liable for any indirect or consequential damages",
        "Our liability is limited to the amount paid for our services",
        "Some jurisdictions may not allow these limitations"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-[#6B46C1] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <h1 className="text-4xl font-normal mb-2">
              Terms of{" "}
              <span className="italic font-serif">Use</span>
            </h1>
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h2 className="text-2xl font-normal mb-4 text-[#6B46C1]">
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-2 h-2 mt-2 mr-3 bg-[#F36C49] rounded-full" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sections.length * 0.1 }}
                className="border-t pt-8 mt-12"
              >
                <h2 className="text-2xl font-normal mb-4 text-[#6B46C1]">
                  Contact Us
                </h2>
                <p className="text-gray-700">
                  If you have any questions about our Terms of Use, please contact us at{" "}
                  <a href="mailto:legal@onioncoach.com" className="text-[#F36C49] hover:underline">
                    legal@onioncoach.com
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 