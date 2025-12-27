'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeftIcon, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { DeckInput, deckSchema } from '@/schemas'
import { deckService } from '@/services'
import Link from 'next/link'
import ColorPicker from './ColorPicker'
import Description from './Description'
import Tags from './Tags'
import Title from './Title'

export function DeckForm({ deckId }: { deckId?: string }) {
	const isEdit = !!deckId

	const [loading, setLoading] = useState(!!deckId)
	const [error, setError] = useState<string | null>(null)

	const form = useForm<DeckInput>({
		resolver: zodResolver(deckSchema),
		defaultValues: {
			title: '',
			color: '#3b82f6',
			tags: [],
			description: '',
		},
		mode: 'onBlur',
		reValidateMode: 'onChange',
	})

	const {
		control,
		reset,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = form

	useEffect(() => {
		if (!deckId) return
		let cancelled = false

		;(async () => {
			setLoading(true)
			setError(null)
			try {
				const deck = await deckService.getById(deckId)
				if (cancelled) return

				reset({
					title: deck.title ?? '',
					color: deck.color ?? '#3b82f6',
					tags: deck.tags ?? [],
					description: deck.description ?? '',
				})
			} catch (e: any) {
				if (!cancelled) setError(e?.message ?? 'Failed to load deck')
			} finally {
				if (!cancelled) setLoading(false)
			}
		})()

		return () => {
			cancelled = true
		}
	}, [deckId, reset])

	const onReset = () => {
		reset({
			title: '',
			color: '#3b82f6',
			tags: [],
			description: '',
		})

		setError(null)
	}

	const onSubmit = handleSubmit(async (values) => {
		setError(null)

		try {
			isEdit
				? await deckService.update(deckId!, values)
				: await deckService.create(values)

			onReset()
		} catch (e: any) {
			setError(e?.message ?? 'Save failed')
		}
	})

	return (
		<Card className='rounded-2xl'>
			<CardHeader>
				<div className='flex items-start justify-between gap-4 flex-wrap'>
					<div className='flex items-center gap-4 flex-wrap'>
						<Link
							href='/dashboard'
							className='block p-2 border shadow rounded-lg hover:bg-slate-100 transition'>
							<ChevronLeftIcon />
						</Link>

						<div>
							<CardTitle className='text-2xl'>
								{isEdit ? 'Edit deck' : 'Create a deck'}
							</CardTitle>

							<CardDescription className='text-lg'>
								{isEdit
									? `Editing deck: ${deckId}`
									: 'Write like a blog: borderless title + live markdown description.'}
							</CardDescription>
						</div>
					</div>

					<div className='flex items-center gap-2'>
						<Button
							variant='secondary'
							onClick={onReset}
							className='rounded-xl'
							disabled={loading || isSubmitting}>
							<Trash2 className='mr-2 h-4 w-4' />
							Reset
						</Button>

						<Button
							onClick={onSubmit}
							className='rounded-xl'
							disabled={loading || isSubmitting}>
							{isSubmitting ? 'Saving…' : 'Save'}
						</Button>
					</div>
				</div>

				{error ? (
					<div className='mt-3 rounded-xl border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive'>
						{error}
					</div>
				) : null}
			</CardHeader>

			<CardContent className='space-y-8'>
				{loading ? (
					<div className='text-sm text-muted-foreground'>
						Loading deck…
					</div>
				) : (
					<>
						<Controller
							control={control}
							name='title'
							render={({ field }) => (
								<Title
									value={field.value}
									onChange={field.onChange}
									error={errors.title?.message}
								/>
							)}
						/>

						<Controller
							control={control}
							name='color'
							render={({ field }) => (
								<ColorPicker
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>

						<Controller
							control={control}
							name='tags'
							render={({ field }) => (
								<Tags
									tags={field.value!}
									setTags={field.onChange}
								/>
							)}
						/>

						<Controller
							control={control}
							name='description'
							render={({ field }) => (
								<Description
									value={field.value!}
									onChange={field.onChange}
									error={errors.description?.message}
								/>
							)}
						/>
					</>
				)}
			</CardContent>
		</Card>
	)
}
