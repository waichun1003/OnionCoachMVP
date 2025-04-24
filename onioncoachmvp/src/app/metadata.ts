import { Metadata } from "next"
import { config } from "./config"

export const defaultMetadata: Metadata = {
    metadataBase: new URL(config.baseUrl),
    title: {
        default: "Onion Coach - Professional Career Coaching",
        template: "%s | Onion Coach"
    },
    description: "Transform your career with personalized coaching from industry experts. Join our community of professionals achieving their career goals.",
    keywords: ["career coaching", "professional development", "career growth", "executive coaching", "leadership development"],
    authors: [{ name: "Onion Coach" }],
    creator: "Onion Coach",
    publisher: "Onion Coach",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: config.baseUrl,
        siteName: "Onion Coach",
        title: "Onion Coach - Professional Career Coaching",
        description: "Transform your career with personalized coaching from industry experts.",
        images: [
            {
                url: `${config.baseUrl}/images/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: "Onion Coach - Professional Career Coaching",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Onion Coach - Professional Career Coaching",
        description: "Transform your career with personalized coaching from industry experts.",
        images: [`${config.baseUrl}/images/twitter-image.jpg`],
        creator: "@onioncoach",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
} 