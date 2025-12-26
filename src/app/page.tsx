'use client'

// Import Shadcn Components
import CTA from '@/components/landing/CTA'
import FAQSection from '@/components/landing/FAQSection'
import Features from '@/components/landing/Features'
import Footer from '@/components/landing/Footer'
import Header from '@/components/landing/Header'
import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import PricingsSection from '@/components/landing/PricingsSection'
import Tags from '@/components/landing/Tags'
import Testimonials from '@/components/landing/Testimonials'
import UseCases from '@/components/landing/UseCases'

export default function LandingPage() {
	return (
		<main className='min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary'>
			<Header />

			<Hero />

			<Tags />

			<Features />

			<HowItWorks />

			<UseCases />

			<Testimonials />

			<PricingsSection />

			<FAQSection />

			<CTA />

			<Footer />
		</main>
	)
}
