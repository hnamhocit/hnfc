'use client'

import { Timestamp } from 'firebase/firestore'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { db, doc, updateDoc } from '@/config'
import { useUserStore } from '@/stores'

export default function SettingsPage() {
	const { user } = useUserStore()

	const [displayName, setDisplayName] = useState('')
	const [photoURL, setPhotoURL] = useState('')
	const [saving, setSaving] = useState(false)
	const [error, setError] = useState('')
	const [ok, setOk] = useState('')

	useEffect(() => {
		if (!user) return
		setDisplayName(user.displayName ?? '')
		setPhotoURL(user.photoURL ?? '')
	}, [user])

	const canSave = useMemo(() => {
		if (!user) return false
		const dn = displayName.trim()
		if (!dn) return false
		const changed =
			dn !== (user.displayName ?? '') ||
			(photoURL.trim() || '') !== (user.photoURL ?? '')
		return changed && !saving
	}, [user, displayName, photoURL, saving])

	const onSave = async () => {
		if (!user) return
		setSaving(true)
		setError('')
		setOk('')
		try {
			await updateDoc(doc(db, 'users', user.id), {
				displayName: displayName.trim(),
				photoURL: photoURL.trim() ? photoURL.trim() : null,
				updatedAt: Timestamp.now(),
			})
			setOk('Saved')
		} catch (e: any) {
			setError(e?.message ?? 'Failed to save')
		} finally {
			setSaving(false)
		}
	}

	return (
		<div className='container mx-auto p-4 md:p-6 space-y-6'>
			<div className='flex items-start justify-between gap-4'>
				<div>
					<h1 className='text-2xl font-bold text-foreground'>
						Settings
					</h1>
					<div className='text-sm text-muted-foreground'>
						Update profile
					</div>
				</div>

				<Button
					asChild
					variant='secondary'>
					<Link href='/me/profile'>Back</Link>
				</Button>
			</div>

			<div className='rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6 space-y-5'>
				<div className='space-y-2'>
					<Label htmlFor='displayName'>Display name</Label>
					<Input
						id='displayName'
						value={displayName}
						onChange={(e) => setDisplayName(e.target.value)}
						placeholder='Your name'
						className='bg-background border-input text-foreground'
					/>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='photoURL'>Photo URL</Label>
					<Input
						id='photoURL'
						value={photoURL}
						onChange={(e) => setPhotoURL(e.target.value)}
						placeholder='https://...'
						className='bg-background border-input text-foreground'
					/>

					<div className='flex items-center gap-3 pt-2'>
						<div className='w-12 h-12 rounded-full bg-muted overflow-hidden flex items-center justify-center border border-border'>
							{photoURL.trim() ? (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={photoURL.trim()}
									alt='preview'
									className='w-full h-full object-cover'
								/>
							) : (
								<div className='text-muted-foreground text-xs'>
									Preview
								</div>
							)}
						</div>

						<div className='text-xs text-muted-foreground'>
							Paste image url. Leave empty if not using avatar.
						</div>
					</div>
				</div>

				{error ? (
					<div className='text-sm text-destructive'>{error}</div>
				) : null}
				{ok ? (
					<div className='text-sm text-emerald-600 dark:text-emerald-400'>
						{ok}
					</div>
				) : null}

				<div className='flex justify-end gap-2'>
					<Button
						asChild
						variant='secondary'>
						<Link href='/me/profile'>Cancel</Link>
					</Button>

					<Button
						onClick={onSave}
						disabled={!canSave}>
						{saving ? 'Saving...' : 'Save changes'}
					</Button>
				</div>
			</div>
		</div>
	)
}
