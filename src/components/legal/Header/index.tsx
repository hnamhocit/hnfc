'use client'

import { ChevronLeftIcon, HomeIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Link from 'next/link'
import { Button } from '../../ui/button'

export default function LegalHeader() {
	const router = useRouter()

	return (
		<header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8'>
			<div className='flex items-center gap-3'>
				<Image
					src='/logo.png'
					alt='hnfc'
					width={44}
					height={44}
					className='rounded-xl'
					priority
				/>

				<div className='leading-tight'>
					<div className='text-lg font-semibold text-foreground'>
						hnfc
					</div>

					<div className='text-sm text-muted-foreground'>
						Legal & Privacy
					</div>
				</div>
			</div>

			<div className='flex items-center gap-2'>
				<Button
					variant='secondary'
					onClick={() => router.back()}>
					<ChevronLeftIcon />
					Back
				</Button>

				<Link href='/dashboard'>
					<Button>
						<HomeIcon />
						Back to Home
					</Button>
				</Link>
			</div>
		</header>
	)
}
