'use client'

import { useTranslations } from 'next-intl'
import Plan from './Plan'

const tiers = ['free', 'plus', 'pro'] as const

export default function Pricing() {
	const t = useTranslations('home.pricing')

	return (
		<section
			id='pricing'
			className='container mx-auto py-24 px-4'>
			<div className='text-center max-w-3xl mx-auto mb-16 space-y-4'>
				<h2 className='text-3xl md:text-4xl font-bold tracking-tight'>
					{t('title')}
				</h2>

				<p className='text-lg text-muted-foreground'>{t('subtitle')}</p>
			</div>

			<div className='grid gap-8 md:grid-cols-3 lg:mx-auto'>
				{tiers.map((tier) => (
					<Plan
						keyword={tier}
						key={tier}
					/>
				))}
			</div>
		</section>
	)
}
