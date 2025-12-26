'use client'

import { Check, Minus } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

// --- Dữ liệu Pricing ---
const TIERS = [
	{
		name: 'Free',
		price: '$0',
		description: 'Perfect for casual learners getting started.',
		features: [
			'Unlimited text cards',
			'5 Decks maximum',
			'Basic progress stats',
			'Sync across 2 devices',
			'Community support',
		],
		limitations: [
			'No image/audio uploads',
			'No offline mode',
			'Standard review speed',
		],
		cta: 'Start Learning',
		popular: false,
	},
	{
		name: 'Plus',
		price: '$4',
		period: '/month',
		description: 'Remove limits and unlock media support.',
		features: [
			'Unlimited Decks & Cards',
			'Image uploads (500MB storage)',
			'Offline study mode',
			'Sync unlimited devices',
			'Advanced heatmaps & stats',
			'Ad-free experience',
		],
		cta: 'Go Plus',
		popular: true, // Highlight gói này
	},
	{
		name: 'Pro',
		price: '$8',
		period: '/month',
		description: 'For power users with heavy media needs.',
		features: [
			'Everything in Plus',
			'5GB Media storage',
			'Audio recording/uploads',
			'Priority email support',
			'Early access to beta features',
			'Export data to CSV/Anki',
		],
		cta: 'Get Pro',
		popular: false,
	},
]

export default function PricingsSection() {
	return (
		<section
			id='pricing'
			className='container mx-auto py-24 px-4'>
			<div className='text-center max-w-3xl mx-auto mb-16 space-y-4'>
				<h2 className='text-3xl md:text-4xl font-bold tracking-tight'>
					Simple, transparent pricing.
				</h2>
				<p className='text-lg text-muted-foreground'>
					Start for free, upgrade when you need more storage or
					offline powers.
				</p>
			</div>

			<div className='grid gap-8 md:grid-cols-3 lg:mx-auto'>
				{TIERS.map((tier) => (
					<Card
						key={tier.name}
						className={`relative flex flex-col rounded-2xl transition-all duration-200 ${
							tier.popular
								? 'border-primary shadow-2xl shadow-primary/10 scale-105 z-10'
								: 'border-border hover:border-primary/50'
						}`}>
						{tier.popular && (
							<div className='absolute -top-4 left-0 right-0 flex justify-center'>
								<Badge className='bg-primary text-primary-foreground hover:bg-primary px-3 py-1 text-sm'>
									Most Popular
								</Badge>
							</div>
						)}

						<CardHeader>
							<CardTitle className='text-xl font-bold text-primary'>
								{tier.name}
							</CardTitle>
							<div className='mt-4 flex items-baseline text-foreground'>
								<span className='text-4xl font-extrabold tracking-tight'>
									{tier.price}
								</span>
								{tier.period && (
									<span className='ml-1 text-sm font-semibold text-muted-foreground'>
										{tier.period}
									</span>
								)}
							</div>
							<CardDescription className='mt-2'>
								{tier.description}
							</CardDescription>
						</CardHeader>

						<CardContent className='flex-1 space-y-4'>
							{/* Features List */}
							<ul className='space-y-3 text-sm'>
								{tier.features.map((feature) => (
									<li
										key={feature}
										className='flex items-center gap-3'>
										<div className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
											<Check className='h-3 w-3' />
										</div>
										<span className='text-muted-foreground'>
											{feature}
										</span>
									</li>
								))}

								{/* Limitations (Optional - greyed out) */}
								{tier.limitations &&
									tier.limitations.map((limit) => (
										<li
											key={limit}
											className='flex items-center gap-3 opacity-50'>
											<div className='flex h-5 w-5 shrink-0 items-center justify-center'>
												<Minus className='h-3 w-3 text-muted-foreground' />
											</div>
											<span className='text-muted-foreground'>
												{limit}
											</span>
										</li>
									))}
							</ul>
						</CardContent>

						<CardFooter>
							<Button
								asChild
								className={`w-full h-12 font-semibold ${
									tier.popular
										? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90'
										: 'bg-muted text-foreground hover:bg-muted/80'
								}`}>
								<Link href='/enter'>{tier.cta}</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</section>
	)
}
