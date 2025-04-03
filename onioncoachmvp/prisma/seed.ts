// import { PrismaClient } from '@prisma/client'
//
// const prisma = new PrismaClient()
//
// async function main() {
//   // First, clear existing articles to avoid duplicates
//   await prisma.article.deleteMany({})
//
//   const articles = [
//     // Health & Fitness
//     {
//       category: 'Health and Fitness',
//       title: '10 Simple Habits for Better Mental Health',
//       description: 'Discover practical daily habits that can significantly improve your mental wellbeing.',
//       content: '<h2>Introduction</h2><p>Mental health is just as important as physical health...</p>',
//       imageUrl: '/articles/mental-health.jpg',
//       readTime: 12,
//       author: 'Dr. Sarah Johnson',
//       tags: JSON.stringify(['mental health', 'wellness', 'mindfulness']),
//     },
//     {
//       category: 'Health and Fitness',
//       title: 'Building a Sustainable Fitness Routine',
//       description: 'Learn how to create and maintain a fitness routine that fits your lifestyle.',
//       content: '<h2>Creating Lasting Habits</h2><p>The key to fitness success is consistency...</p>',
//       imageUrl: '/articles/fitness-routine.jpg',
//       readTime: 10,
//       author: 'Mike Thompson',
//       tags: JSON.stringify(['fitness', 'exercise', 'healthy lifestyle']),
//     },
//
//     // Family
//     {
//       category: 'Family',
//       title: 'Building Stronger Family Bonds',
//       description: 'Learn effective strategies to strengthen your family relationships.',
//       content: '<h2>Quality Time</h2><p>In today\'s busy world, quality family time is essential...</p>',
//       imageUrl: '/articles/family-bonds.jpg',
//       readTime: 8,
//       author: 'Dr. Emily Chen',
//       tags: JSON.stringify(['family', 'relationships', 'parenting']),
//     },
//     {
//       category: 'Family',
//       title: 'Effective Communication in Families',
//       description: 'Improve family dynamics through better communication techniques.',
//       content: '<h2>Open Dialogue</h2><p>Creating safe spaces for family discussions...</p>',
//       imageUrl: '/articles/family-communication.jpg',
//       readTime: 15,
//       author: 'Lisa Martinez',
//       tags: JSON.stringify(['communication', 'family dynamics', 'relationships']),
//     },
//
//     // Work
//     {
//       category: 'Work',
//       title: 'Mastering Work-Life Balance',
//       description: 'Strategies for maintaining harmony between professional and personal life.',
//       content: '<h2>Setting Boundaries</h2><p>Clear boundaries are essential for balance...</p>',
//       imageUrl: '/articles/work-life.jpg',
//       readTime: 10,
//       author: 'Mark Anderson',
//       tags: JSON.stringify(['work-life balance', 'productivity', 'stress management']),
//     },
//     {
//       category: 'Work',
//       title: 'Career Growth Strategies',
//       description: 'Actionable steps to advance your career and achieve professional goals.',
//       content: '<h2>Professional Development</h2><p>Taking control of your career path...</p>',
//       imageUrl: '/articles/career-growth.jpg',
//       readTime: 12,
//       author: 'Jennifer Lee',
//       tags: JSON.stringify(['career development', 'professional growth', 'leadership']),
//     },
//
//     // Money
//     {
//       category: 'Money',
//       title: 'Smart Financial Planning Basics',
//       description: 'Essential tips for managing your finances and building wealth.',
//       content: '<h2>Financial Freedom</h2><p>Building a strong financial foundation...</p>',
//       imageUrl: '/articles/financial-planning.jpg',
//       readTime: 15,
//       author: 'Robert Chang',
//       tags: JSON.stringify(['finance', 'money management', 'investing']),
//     },
//     {
//       category: 'Money',
//       title: 'Building Long-term Wealth',
//       description: 'Strategic approaches to investing and wealth creation.',
//       content: '<h2>Investment Strategies</h2><p>Long-term wealth building principles...</p>',
//       imageUrl: '/articles/wealth-building.jpg',
//       readTime: 20,
//       author: 'David Miller',
//       tags: JSON.stringify(['investing', 'wealth management', 'financial planning']),
//     },
//
//     // Personal Growth
//     {
//       category: 'Personal Growth',
//       title: 'Developing Emotional Intelligence',
//       description: 'Enhance your emotional awareness and interpersonal skills.',
//       content: '<h2>Understanding EQ</h2><p>The importance of emotional intelligence...</p>',
//       imageUrl: '/articles/emotional-intelligence.jpg',
//       readTime: 12,
//       author: 'Dr. Rachel Green',
//       tags: JSON.stringify(['emotional intelligence', 'self-awareness', 'personal development']),
//     },
//     {
//       category: 'Personal Growth',
//       title: 'Goal Setting and Achievement',
//       description: 'Effective methods for setting and achieving personal goals.',
//       content: '<h2>SMART Goals</h2><p>Setting achievable and meaningful goals...</p>',
//       imageUrl: '/articles/goal-setting.jpg',
//       readTime: 10,
//       author: 'Tom Wilson',
//       tags: JSON.stringify(['goal setting', 'motivation', 'success']),
//     },
//
//     // Spirituality
//     {
//       category: 'Spirituality',
//       title: 'Mindfulness in Daily Life',
//       description: 'Incorporate mindfulness practices into your daily routine.',
//       content: '<h2>Present Moment</h2><p>Living mindfully in everyday situations...</p>',
//       imageUrl: '/articles/mindfulness.jpg',
//       readTime: 8,
//       author: 'Sarah Wong',
//       tags: JSON.stringify(['mindfulness', 'meditation', 'spiritual growth']),
//     },
//     {
//       category: 'Spirituality',
//       title: 'Finding Inner Peace',
//       description: 'Practices for cultivating peace and spiritual well-being.',
//       content: '<h2>Inner Harmony</h2><p>Developing a peaceful mindset...</p>',
//       imageUrl: '/articles/inner-peace.jpg',
//       readTime: 15,
//       author: 'Michael Chen',
//       tags: JSON.stringify(['spirituality', 'meditation', 'peace']),
//     },
//   ]
//
//   console.log('Starting to seed articles...')
//
//   for (const article of articles) {
//     await prisma.article.create({
//       data: article,
//     })
//   }
//
//   console.log(`Seeded ${articles.length} articles successfully`)
// }
//
// main()
//   .catch((e) => {
//     console.error('Error seeding database:', e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })