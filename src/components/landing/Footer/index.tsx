import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
	return (
		<footer className='border-t border-border bg-muted/20'>
			<div className='container mx-auto pt-16 pb-8 px-4'>
				<div className='grid gap-12 md:grid-cols-4 mb-12'>
					{/* Brand */}
					<div className='space-y-4'>
						<div className='flex items-center gap-3'>
							<div className='relative h-10 w-10 overflow-hidden rounded-xl shadow-sm'>
								<Image
									src='/logo.png'
									alt='hnfc'
									fill
									className='object-cover'
								/>
							</div>

							<span className='text-lg font-bold'>hnfc</span>
						</div>

						<p className='text-sm text-muted-foreground leading-relaxed'>
							The smart flashcard app for serious learners. Master
							any subject with ease.
						</p>
					</div>

					<div>
						<h3 className='font-semibold mb-4'>Product</h3>

						<ul className='space-y-3 text-sm text-muted-foreground'>
							{[
								'Features',
								'Pricing',
								'Download',
								'Changelog',
							].map((item) => (
								<li key={item}>
									<Link
										href='#'
										className='hover:text-primary transition-colors'>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className='font-semibold mb-4'>Resources</h3>

						<ul className='space-y-3 text-sm text-muted-foreground'>
							{[
								'Blog',
								'Community',
								'Help Center',
								'API Docs',
							].map((item) => (
								<li key={item}>
									<Link
										href='#'
										className='hover:text-primary transition-colors'>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className='font-semibold mb-4'>Stay updated</h3>

						<form className='space-y-3'>
							<Input
								type='email'
								placeholder='Enter your email'
								className='bg-background border-border focus-visible:ring-primary'
							/>

							<Button className='w-full bg-primary text-primary-foreground'>
								Subscribe
							</Button>
						</form>
					</div>
				</div>

				<Separator className='mb-8' />

				<div className='flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground'>
					<div>
						© {new Date().getFullYear()} hnfc Inc. All rights
						reserved.
					</div>

					<div className='flex gap-6'>
						<Link
							href='/privacy'
							className='hover:text-foreground'>
							Privacy Policy
						</Link>

						<Link
							href='/terms'
							className='hover:text-foreground'>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
