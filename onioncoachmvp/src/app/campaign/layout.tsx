import { ErrorBoundary } from '@/components/error-boundary'

export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  )
} 