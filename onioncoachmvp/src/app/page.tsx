import { NavBar } from "@/components/nav-bar"
import { HeroSection } from "@/components/hero-section"
import { ScrollingBanner } from "@/components/scrolling-banner"
import { GamifiedJourney } from "@/components/gamified-journey"
import { TransformSection } from "@/components/transform-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { FAQSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
      <div className="min-h-screen bg-[#EDE6DC]">
        <NavBar />
        <main>
          <HeroSection />
          <ScrollingBanner />
          <GamifiedJourney />
          <TransformSection />
          <TestimonialSection />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
  )
}

