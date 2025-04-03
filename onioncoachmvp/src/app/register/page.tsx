"use client"

import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import AssessmentFlow from "@/components/assessment-flow"

export default function RegisterPage() {
                return (
    <div className="min-h-screen bg-[#EDE6DC]">
            <NavBar />
      <main>
        <AssessmentFlow />
            </main>
            <Footer />
        </div>
    )
}

