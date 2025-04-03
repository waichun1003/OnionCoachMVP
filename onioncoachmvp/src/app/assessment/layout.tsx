export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="relative z-50 h-screen w-full overflow-hidden bg-[#ede6dc]">
      {children}
    </main>
  )
} 