"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "Personal Information: Name, email address, and professional details you provide.",
        "Usage Data: Information about how you interact with our platform.",
        "Coaching Session Data: Information related to your coaching sessions and progress.",
        "Technical Data: IP address, browser type, and device information."
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide and improve our coaching services",
        "To personalize your experience on our platform",
        "To communicate with you about our services",
        "To ensure the security and functionality of our platform"
      ]
    },
    {
      title: "Information Sharing",
      content: [
        "We do not sell your personal information",
        "We share information with coaches only as necessary for service delivery",
        "We may share data with service providers who assist our operations",
        "We may disclose information when required by law"
      ]
    },
    {
      title: "Data Security",
      content: [
        "We implement appropriate security measures to protect your data",
        "Regular security assessments and updates",
        "Encrypted data transmission and storage",
        "Access controls and monitoring"
      ]
    },
    {
      title: "Your Rights",
      content: [
        "Access your personal information",
        "Request corrections to your data",
        "Delete your account and associated data",
        "Opt-out of marketing communications"
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
              Privacy{" "}
              <span className="italic font-serif">Policy</span>
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
                  If you have any questions about our Privacy Policy, please contact us at{" "}
                  <a href="mailto:privacy@onioncoach.com" className="text-[#F36C49] hover:underline">
                    privacy@onioncoach.com
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