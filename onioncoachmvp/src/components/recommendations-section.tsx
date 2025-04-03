'use client'

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { getRandomPlaceholderImage } from '@/lib/utils/placeholder-images'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Article {
  id: string
  category: string
  title: string
  summary: string
  imageUrl: string | null
  url: string
  readTime: number
}

// Add a mapping from new category names to old category names
const categoryMapping: Record<string, string> = {
  "Family Clan": "Family",
  "Adventure Party": "Friends",
  "Love Quest": "Romantic Life",
  "Hero's Journey": "Work",
  "Side Hustle Dungeon": "Business",
  "Treasure Vault": "Money",
  "Character Development": "Personal Growth",
  "Health XP Bar": "Health and Fitness"
};

export function RecommendationsSection({ scores }: { scores: Record<string, number> }) {
  const router = useRouter()
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  // Get image source with better fallback handling
  const getImageSource = (article: Article) => {
    // Case 1: No image URL or already errored
    if (!article.imageUrl || imageErrors[article.id]) {
      return getRandomPlaceholderImage(article.category)
    }

    // Case 2: Has image URL, validate it
    try {
      const url = new URL(article.imageUrl)
      return url.toString()
    } catch (e) {
      console.error(`Invalid image URL for article ${article.id}:`, article.imageUrl)
      return getRandomPlaceholderImage(article.category)
    }
  }

  // Get categories that need improvement (score <= 5)
  const categoriesNeedingImprovement = Object.entries(scores)
    .filter(([_, score]) => score <= 5)
    .map(([category]) => {
      // Map new category names to old category names for API compatibility
      return categoryMapping[category] || category;
    });

  // Fetch articles for those categories
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ['articles', categoriesNeedingImprovement],
    queryFn: async () => {
      const response = await fetch(
        `/api/articles?categories=${categoriesNeedingImprovement.join(',')}`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    enabled: categoriesNeedingImprovement.length > 0,
  })

  const handleArticleClick = (e: React.MouseEvent<HTMLAnchorElement>, article: Article) => {
    e.preventDefault()
    
    // Check if it's an external URL
    if (article.url.startsWith('http')) {
      // Open external links in new tab with security attributes
      window.open(article.url, '_blank', 'noopener,noreferrer')
      
      // Optional: Track click analytics
      try {
        fetch('/api/articles/track-click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ articleId: article.id })
        })
      } catch (error) {
        console.error('Error tracking article click:', error)
      }
    } else {
      // Handle internal links
      router.push(article.url)
    }
  }

  // Function to get the display category (new category name)
  const getDisplayCategory = (dbCategory: string) => {
    // Find the new category name that maps to this old category name
    const entry = Object.entries(categoryMapping).find(([_, oldCategory]) => oldCategory === dbCategory);
    return entry ? entry[0] : dbCategory;
  };

  // Function to get the color class based on the category
  const getCategoryColorClass = (category: string) => {
    // First map to new category if needed
    const displayCategory = getDisplayCategory(category);
    
    switch (displayCategory) {
      case "Family Clan":
        return 'bg-[#9BEA5E] text-gray-800';
      case "Adventure Party":
        return 'bg-[#5EC4EA] text-gray-800';
      case "Love Quest":
        return 'bg-[#17CDBA] text-gray-800';
      case "Hero's Journey":
        return 'bg-[#26FFE6] text-gray-800';
      case "Side Hustle Dungeon":
        return 'bg-[#FF4D88] text-white';
      case "Treasure Vault":
        return 'bg-[#CA88FF] text-white';
      case "Character Development":
        return 'bg-[#EA755E] text-white';
      case "Health XP Bar":
        return 'bg-[#EADE5E] text-gray-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <section className="w-full bg-[#EDE6DC] py-[108px]">
        <div className="max-w-[1442px] mx-auto px-[70px]">
          <div className="animate-pulse space-y-8">
            {/* Loading skeleton */}
            <div className="h-32 bg-gray-200 rounded-xl" />
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="space-y-4">
                  <div className="h-[330px] bg-gray-200 rounded-xl" />
                  <div className="h-6 bg-gray-200 rounded w-1/4" />
                  <div className="h-8 bg-gray-200 rounded" />
                  <div className="h-20 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!articles?.length) {
    return (
      <section className="w-full bg-[#EDE6DC] py-[108px]">
        <div className="max-w-[1442px] mx-auto px-[70px]">
          <div className="text-center">
            <h2 className="text-2xl font-medium mb-4">No articles found</h2>
            <p className="text-gray-600">
              We're working on creating more content for these categories.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-20 bg-[#F9F7F4]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between mb-16">
            <h2 className="text-[56px] leading-[110%] font-normal max-w-[644px] text-gray-900">
              Based on your need,
              <span className="block font-serif italic">our improvement tips.</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-[533px]">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles?.map((article) => (
              <Link 
                key={article.id} 
                href={article.url}
                onClick={(e) => handleArticleClick(e, article)}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 rounded-xl">
                    <Image
                      src={getImageSource(article)}
                      alt={article.title}
                      fill
                      className={cn(
                        "object-cover transition-transform duration-300 group-hover:scale-105",
                        "filter brightness-[0.98] contrast-[1.02]"
                      )}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={85}
                      priority={false}
                      loading="lazy"
                      onError={() => {
                        console.log(`Image load failed for article ${article.id}, using placeholder`)
                        setImageErrors(prev => ({
                          ...prev,
                          [article.id]: true
                        }))
                      }}
                    />
                  </div>
                  <div className="mt-6 space-y-4">
                    <span 
                      className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide ${getCategoryColorClass(article.category)}`}
                    >
                      {getDisplayCategory(article.category)}
                    </span>
                    <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-base text-gray-700 line-clamp-3">
                      {article.summary}
                    </p>
                    <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {article.readTime} min read
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}