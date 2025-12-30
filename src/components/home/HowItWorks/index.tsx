import { LayersIcon, PlayIcon, StarIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Step from './Step'

const howItWorkds = [
	{
		keyword: 'create',
		icon: <LayersIcon />,
	},
	{
		keyword: 'review',
		icon: <PlayIcon />,
	},
	{
		keyword: 'master',
		icon: <StarIcon />,
	},
]

export default function HowItWorks() {
	const t = useTranslations('home.howItWorks')

	return (
		<section
			id='how'
			className='container mx-auto py-24 px-4'>
			<div className='text-center max-w-3xl mx-auto mb-16'>
				<h2 className='text-3xl font-bold tracking-tight mb-4'>
					{t('title')}
				</h2>

				<p className='text-lg text-muted-foreground'>{t('subtitle')}</p>
			</div>

			<div className='grid gap-8 md:grid-cols-3 relative'>
				{/* Connecting Line (Desktop) */}
				<div className='hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-linear-to-r from-transparent via-border to-transparent -z-10' />

				{howItWorkds.map((x, i) => (
					<Step
						key={x.keyword}
						{...x}
						step={i + 1}
					/>
				))}
			</div>
		</section>
	)
}
