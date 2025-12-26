import { Card, CardContent } from '@/components/ui/card'
import { StarIcon } from 'lucide-react'

const TESTIMONIALS = [
	{
		name: 'Minh T.',
		role: 'Student',
		quote: 'Clean UI. I can review daily without feeling overwhelmed.',
		initial: 'M',
	},
	{
		name: 'Lan P.',
		role: 'Language learner',
		quote: 'Hotkeys + quick sessions helped me keep a streak.',
		initial: 'L',
	},
	{
		name: 'Huy N.',
		role: 'Software engineer',
		quote: 'Perfect for interview prep. Decks are easy to organize.',
		initial: 'H',
	},
]

export default function Testimonials() {
	return (
		<section className='container mx-auto py-24 px-4'>
			<h2 className='text-3xl font-bold tracking-tight text-center mb-12'>
				Loved by learners
			</h2>
			<div className='grid gap-6 md:grid-cols-3'>
				{TESTIMONIALS.map((t, i) => (
					<Card
						key={i}
						className='rounded-2xl border-none shadow-lg bg-linear-to-br from-background to-muted/50'>
						<CardContent className='p-8'>
							<div className='flex gap-1 mb-4'>
								{[1, 2, 3, 4, 5].map((star) => (
									<StarIcon
										key={star}
										className='w-4 h-4 fill-yellow-400 text-yellow-400'
									/>
								))}
							</div>

							<p className='text-base text-foreground/80 italic mb-6 leading-relaxed'>
								"{t.quote}"
							</p>

							<div className='flex items-center gap-3'>
								<div className='w-10 h-10 rounded-full bg-linear-to-br from-primary to-purple-400 flex items-center justify-center text-white font-bold'>
									{t.initial}
								</div>

								<div>
									<div className='font-bold text-sm'>
										{t.name}
									</div>

									<div className='text-xs text-muted-foreground'>
										{t.role}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	)
}
