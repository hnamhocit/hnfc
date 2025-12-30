'use client'

import Link from 'next/link'
import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { useUserStore } from '@/stores'

export default function ProfilePage() {
	const { user } = useUserStore()

	const createdAt = useMemo(() => {
		if (!user?.createdAt) return '-'
		return user.createdAt.toDate().toLocaleString()
	}, [user?.createdAt])

	const updatedAt = useMemo(() => {
		if (!user?.updatedAt) return '-'
		return user.updatedAt.toDate().toLocaleString()
	}, [user?.updatedAt])

	return (
		<div className='container mx-auto p-4 md:p-6 space-y-6'>
			<div className='flex items-start justify-between gap-4'>
				<div>
					<h1 className='text-2xl font-bold text-foreground'>
						Profile
					</h1>
					<div className='text-sm text-muted-foreground'>
						User profile information
					</div>
				</div>

				<Button
					asChild
					variant='secondary'>
					<Link href='/me/settings'>Settings</Link>
				</Button>
			</div>

			<div className='rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6'>
				<div className='flex items-center gap-4'>
					<div className='w-16 h-16 rounded-full bg-muted overflow-hidden flex items-center justify-center border border-border'>
						{user?.photoURL ? (
							// eslint-disable-next-line @next/next/no-img-element
							<img
								src={user.photoURL}
								alt='avatar'
								className='w-full h-full object-cover'
							/>
						) : (
							<div className='text-muted-foreground text-sm'>
								No avatar
							</div>
						)}
					</div>

					<div className='min-w-0'>
						<div className='text-lg font-semibold text-foreground truncate'>
							{user?.displayName || '(No display name)'}
						</div>

						<div className='text-sm text-muted-foreground truncate'>
							{user?.email || '-'}
						</div>

						<div className='text-xs text-muted-foreground/80 mt-1 truncate'>
							User ID: {user?.id}
						</div>
					</div>
				</div>

				<div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
					<div className='rounded-lg border border-border p-4 bg-background/40'>
						<div className='text-muted-foreground'>Created</div>
						<div className='text-foreground font-medium'>
							{createdAt}
						</div>
					</div>

					<div className='rounded-lg border border-border p-4 bg-background/40'>
						<div className='text-muted-foreground'>Updated</div>
						<div className='text-foreground font-medium'>
							{updatedAt}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
