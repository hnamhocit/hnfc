import {
	BriefcaseIcon,
	GlobeIcon,
	GraduationCapIcon,
	StethoscopeIcon,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const USE_CASES = [
	{
		icon: <GlobeIcon className='w-8 h-8 text-blue-500' />,
		title: 'Language learning',
		desc: 'Vocabulary, phrases, and pronunciation drills.',
		tag: 'Languages',
	},
	{
		icon: <GraduationCapIcon className='w-8 h-8 text-yellow-500' />,
		title: 'Exam prep',
		desc: 'Definitions, formulas, and quick recall practice.',
		tag: 'Students',
	},
	{
		icon: <BriefcaseIcon className='w-8 h-8 text-primary' />,
		title: 'Tech & interviews',
		desc: 'Concepts, system design, and common Q&A.',
		tag: 'Career',
	},
	{
		icon: <StethoscopeIcon className='w-8 h-8 text-red-500' />,
		title: 'Medical / law',
		desc: 'Dense knowledge made reviewable and consistent.',
		tag: 'Pro',
	},
]

export default function UseCases() {
	return (
		<section
			id='use-cases'
			className='py-24 bg-linear-to-b from-background to-muted/30'>
			<div className='container mx-auto px-4'>
				<div className='flex items-center justify-between mb-12'>
					<div>
						<h2 className='text-3xl font-bold tracking-tight'>
							Use Cases
						</h2>

						<p className='mt-2 text-muted-foreground'>
							Perfect for any type of learner.
						</p>
					</div>
				</div>

				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
					{USE_CASES.map((u, i) => (
						<Card
							key={i}
							className='rounded-2xl overflow-hidden border-border/50 hover:border-primary/40 transition-all'>
							<CardHeader className='bg-muted/30 pb-4'>
								<div className='flex justify-between items-start'>
									<div className='p-2 rounded-xl bg-background shadow-sm border border-border/50'>
										{u.icon}
									</div>

									<Badge variant='outline'>{u.tag}</Badge>
								</div>
							</CardHeader>

							<CardContent className='pt-6'>
								<CardTitle className='text-lg mb-2'>
									{u.title}
								</CardTitle>

								<p className='text-sm text-muted-foreground'>
									{u.desc}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
