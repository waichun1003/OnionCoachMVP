export default function ResultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden">
      {children}
    </div>
  )
} 