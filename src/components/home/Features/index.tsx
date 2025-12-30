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
import { useTranslations } from 'next-intl'
import Feature from './Feature'

const FEATURES = [
	{
		icon: <Zap className='w-5 h-5' />,
		keyword: 'createFast',
	},
	{
		icon: <Layers className='w-5 h-5' />,
		keyword: 'studySmarter',
	},
	{
		icon: <Smartphone className='w-5 h-5' />,
		keyword: 'crossPlatform',
	},
	{
		icon: <Keyboard className='w-5 h-5' />,
		keyword: 'keyboardFriendly',
	},
	{
		icon: <Search className='w-5 h-5' />,
		keyword: 'tagsSearch',
	},
	{
		icon: <Activity className='w-5 h-5' />,
		keyword: 'progressTracking',
	},
]

export default function Features() {
	const t = useTranslations('home.features.headline')

	return (
		<section
			id='features'
			className='bg-muted/30 py-24'>
			<div className='container mx-auto px-4'>
				<div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
					<div className='max-w-2xl'>
						<h2 className='text-3xl font-bold tracking-tight mb-4'>
							{t('title')}
							<span className='text-primary'>
								{t('highlight')}
							</span>
						</h2>

						<p className='text-lg text-muted-foreground'>
							{t('description')}
						</p>
					</div>

					<Button
						variant='outline'
						asChild>
						<Link href='/enter'>{t('cta')}</Link>
					</Button>
				</div>

				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{FEATURES.map((f) => (
						<Feature
							key={f.keyword}
							{...f}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
