import {
	Activity,
	Keyboard,
	Layers,
	Search,
	Smartphone,
	Zap,
} from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const FEATURES = [
	{
		icon: <Zap className='w-5 h-5' />,
		title: 'Create decks fast',
		desc: 'Build flashcards in seconds with a clean editor and smart defaults.',
	},
	{
		icon: <Layers className='w-5 h-5' />,
		title: 'Study smarter',
		desc: 'Spaced repetition-inspired flow to help you remember longer.',
	},
	{
		icon: <Smartphone className='w-5 h-5' />,
		title: 'Cross-platform',
		desc: 'Use hnfc on any device. Your progress stays with you.',
	},
	{
		icon: <Keyboard className='w-5 h-5' />,
		title: 'Keyboard-friendly',
		desc: 'Speed through reviews using hotkeys for a focused workflow.',
	},
	{
		icon: <Search className='w-5 h-5' />,
		title: 'Tags & search',
		desc: 'Organize decks with tags and find cards instantly.',
	},
	{
		icon: <Activity className='w-5 h-5' />,
		title: 'Progress tracking',
		desc: 'See streaks, accuracy, and review volume at a glance.',
	},
]

export default function Features() {
	return (
		<section
			id='features'
			className='bg-muted/30 py-24'>
			<div className='container mx-auto px-4'>
				<div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
					<div className='max-w-2xl'>
						<h2 className='text-3xl font-bold tracking-tight mb-4'>
							Everything you need to{' '}
							<span className='text-primary'>
								master any subject.
							</span>
						</h2>

						<p className='text-lg text-muted-foreground'>
							Powerful tools designed to help you build a
							consistent study habit without the friction.
						</p>
					</div>

					<Button
						variant='outline'
						asChild>
						<Link href='/enter'>Explore all features</Link>
					</Button>
				</div>

				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{FEATURES.map((f, i) => (
						<Card
							key={i}
							className='rounded-2xl border-border/50 bg-background transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 group'>
							<CardHeader>
								<div className='w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2 group-hover:scale-110 transition-transform'>
									{f.icon}
								</div>

								<CardTitle className='text-xl'>
									{f.title}
								</CardTitle>
							</CardHeader>

							<CardContent>
								<p className='text-muted-foreground leading-relaxed'>
									{f.desc}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
