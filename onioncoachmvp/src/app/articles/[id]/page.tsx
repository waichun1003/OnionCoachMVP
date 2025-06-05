import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { NavBar } from '@/components/nav-bar'

// Force dynamic rendering to prevent static generation at build time
export const dynamic = 'force-dynamic'

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await prisma.article.findUnique({
    where: { id: params.id },
  })

  if (!article) {
    notFound()
  }

  return (
    <>
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-24">
        <article className="prose prose-lg">
          <h1>{article.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>
      </main>
    </>
  )
} 