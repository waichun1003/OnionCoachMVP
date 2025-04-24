export const config = {
    isBeta: process.env.NEXT_PUBLIC_IS_BETA === 'true',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://onioncoach.com',
    betaUrl: process.env.NEXT_PUBLIC_BETA_URL || 'https://beta.onioncoach.com',
    features: {
        waitlist: true,
        coachMatching: true,
        pricing: true,
    },
    analytics: {
        googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
        hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID,
    },
    social: {
        linkedin: 'https://linkedin.com/company/onioncoach',
        discord: 'https://discord.gg/onioncoach',
    }
} 