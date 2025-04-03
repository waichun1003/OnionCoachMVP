import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingCoaches() {
  return (
    <div className="min-h-screen bg-[#EDE6DC]">
      <div className="pt-32">
        {/* Skeleton for Tabs and Search */}
        <section className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <Skeleton className="h-10 w-48 mb-8" />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <Skeleton className="h-12 flex-1 rounded-full" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-32 rounded-full" />
                <Skeleton className="h-12 w-32 rounded-full" />
              </div>
            </div>

            {/* Categories Skeleton */}
            <div className="mb-12">
              <div className="flex gap-3 overflow-x-auto pb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-10 w-32 rounded-full flex-shrink-0" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skeleton Cards */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card 
                  key={index}
                  className="overflow-hidden bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-100/50"
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center mb-6">
                      <Skeleton className="w-24 h-24 rounded-full mb-4" />
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-36 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>

                    <div className="flex gap-2 justify-center mb-6">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-6 w-20 rounded-full" />
                      ))}
                    </div>

                    <div className="flex justify-center gap-6 mb-6">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>

                    <Skeleton className="h-12 w-full rounded-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 