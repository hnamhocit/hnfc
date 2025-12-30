import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { CheckIcon, MinusIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Plan({ keyword }: { keyword: string }) {
	const t = useTranslations('home.pricing.plans.' + keyword)
	const isPopular = keyword === 'plus'

	return (
		<Card
			className={`relative flex flex-col rounded-2xl transition-all duration-200 ${
				isPopular
					? 'border-primary shadow-2xl shadow-primary/10 scale-105 z-10'
					: 'border-border hover:border-primary/50'
			}`}>
			{isPopular && (
				<div className='absolute -top-4 left-0 right-0 flex justify-center'>
					<Badge className='bg-primary text-primary-foreground hover:bg-primary px-3 py-1 text-sm'>
						Most Popular
					</Badge>
				</div>
			)}

			<CardHeader>
				<CardTitle className='text-xl font-bold text-primary'>
					{t('name')}
				</CardTitle>

				<div className='mt-4 flex items-baseline text-foreground'>
					<span className='text-4xl font-extrabold tracking-tight'>
						{t('price')}
					</span>

					{t.has('period') && (
						<span className='ml-1 text-sm font-semibold text-muted-foreground'>
							{t('period')}
						</span>
					)}
				</div>

				<CardDescription className='mt-2'>
					{t('description')}
				</CardDescription>
			</CardHeader>

			<CardContent className='flex-1 space-y-4'>
				{/* Features List */}
				<ul className='space-y-3 text-sm'>
					{(t.raw('features') as string[]).map((feature) => (
						<li
							key={feature}
							className='flex items-center gap-3'>
							<div className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
								<CheckIcon className='h-3 w-3' />
							</div>

							<span className='text-muted-foreground'>
								{feature}
							</span>
						</li>
					))}

					{/* Limitations (Optional - greyed out) */}
					{t.has('limitations') &&
						(t.raw('limitations') as string[]).map((limit) => (
							<li
								key={limit}
								className='flex items-center gap-3 opacity-50'>
								<div className='flex h-5 w-5 shrink-0 items-center justify-center'>
									<MinusIcon className='h-3 w-3 text-muted-foreground' />
								</div>

								<span className='text-muted-foreground'>
									{limit}
								</span>
							</li>
						))}
				</ul>
			</CardContent>

			<CardFooter>
				<Link
					href='/enter'
					className='block w-full'>
					<Button
						className={`w-full h-12 font-semibold ${
							isPopular
								? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90'
								: 'bg-muted text-foreground hover:bg-muted/80'
						}`}>
						{t('cta')}
					</Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
