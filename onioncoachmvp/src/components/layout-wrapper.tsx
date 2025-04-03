'use client'

import { usePathname } from "next/navigation"
import { NavBar } from "@/components/nav-bar"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAssessment = pathname === '/assessment' || pathname?.startsWith('/assessment/')

  if (isAssessment) {
    return <>{children}</>
  }

  return (
    <>
      <NavBar />
      <div className="relative">
        {/* Animated gradient overlays */}
        <div className="fixed inset-0 z-0">
          <div className="absolute -left-1/4 top-0 w-[1000px] h-[1000px] 
            bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute -right-1/4 top-1/4 w-[1000px] h-[1000px] 
            bg-orange-200/30 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </>
  )
} 