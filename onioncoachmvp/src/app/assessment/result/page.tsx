"use client"

import { AssessmentResult } from "@/components/assessment-result"
import { useSearchParams } from "next/navigation"

export default function ResultPage() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name') || ''
  const scores = JSON.parse(searchParams.get('scores') || '{}')

  return <AssessmentResult name={name} scores={scores} />
} 