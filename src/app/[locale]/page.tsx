import { Hero } from '@/components/home/hero'
import { MetricsBand } from '@/components/home/metrics-band'
import { HowItWorksSummary } from '@/components/home/how-it-works-summary'
import { FeaturedSaas } from '@/components/home/featured-saas'
import { IdeasTeaser } from '@/components/home/ideas-teaser'
import { Testimonials } from '@/components/home/testimonials'

export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricsBand />
      <HowItWorksSummary />
      <FeaturedSaas />
      <IdeasTeaser />
      <Testimonials />
    </>
  )
}
