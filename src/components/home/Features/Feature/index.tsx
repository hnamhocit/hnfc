import { ReactNode } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslations } from 'next-intl'

interface FeatureProps {
	icon: ReactNode
	keyword: string
}

export default function Feature({ icon, keyword }: FeatureProps) {
	const t = useTranslations('home.features.items.' + keyword)

	return (
		<Card className='rounded-2xl border-border/50 bg-background transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 group'>
			<CardHeader>
				<div className='w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2 group-hover:scale-110 transition-transform'>
					{icon}
				</div>

				<CardTitle className='text-xl'>{t('title')}</CardTitle>
			</CardHeader>

			<CardContent>
				<p className='text-muted-foreground leading-relaxed'>
					{t('description')}
				</p>
			</CardContent>
		</Card>
	)
}
