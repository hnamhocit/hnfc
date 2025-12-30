import { ArrowRightIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import Badges from './Badges'
import Stats from './Stats'

export default function Left() {
	const t = useTranslations('home.hero')

	return (
		<div className='flex flex-col items-start text-left'>
			<Badges />

			<h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6'>
				{t('title.line1')}
				<br className='hidden lg:block' />
				<span className='text-transparent bg-clip-text bg-linear-to-r from-primary via-purple-500 to-fuchsia-500'>
					{t('title.line2')}
				</span>
			</h1>

			<p className='max-w-xl text-lg text-muted-foreground mb-8 leading-relaxed'>
				{t('description')}
			</p>

			<div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
				<Link href='/enter'>
					<Button
						size='lg'
						className='px-8 py-6 shadow-xl shadow-primary/20'>
						{t('cta.primary')}
						<ArrowRightIcon className='ml-2 w-4 h-4' />
					</Button>
				</Link>

				<Link href='#features'>
					<Button
						size='lg'
						variant='outline'
						className='px-8 py-6'>
						{t('cta.secondary')}
					</Button>
				</Link>
			</div>

			<Stats />
		</div>
	)
}
