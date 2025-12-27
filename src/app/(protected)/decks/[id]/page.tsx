'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import MarkdownLive from '@/components/MarkdownLive'
import { Button } from '@/components/ui/button'
import type { IDeck } from '@/interfaces'
import { deckService } from '@/services'
import { ChevronLeftIcon, PlayCircleIcon } from 'lucide-react'

type LoadState = 'loading' | 'ready' | 'not_found' | 'error'

export default function DeckDetailPage() {
	const { id } = useParams<{ id: string }>()
	const router = useRouter()

	const [state, setState] = useState<LoadState>('loading')
	const [deck, setDeck] = useState<IDeck | null>(null)
	const [error, setError] = useState<string>('')

	useEffect(() => {
		let alive = true

		async function run() {
			if (!id) return
			setState('loading')
			setError('')

			try {
				const d = await deckService.getById(id)
				if (!alive) return
				setDeck(d)
				setState('ready')
			} catch (e: any) {
				if (!alive) return

				const msg = e?.message ?? 'Failed to load deck'
				setError(msg)

				if (msg.toLowerCase().includes('not found')) {
					setState('not_found')
				} else {
					setState('error')
				}
			}
		}

		run()
		return () => {
			alive = false
		}
	}, [id])

	if (state === 'loading') {
		return (
			<div className='container mx-auto p-4 md:p-6'>
				<div className='text-slate-500'>Loading deck...</div>
			</div>
		)
	}

	if (state === 'not_found') {
		return (
			<div className='container mx-auto p-4 md:p-6 space-y-4'>
				<div className='text-slate-800 font-semibold'>
					Deck not found!
				</div>

				<Button
					asChild
					variant='secondary'>
					<Link href='/dashboard'>Back</Link>
				</Button>
			</div>
		)
	}

	if (state === 'error' || !deck) {
		return (
			<div className='container mx-auto p-4 md:p-6 space-y-4'>
				<div className='text-red-600 font-semibold'>
					Error when loading deck
				</div>

				<div className='text-slate-600 text-sm'>{error}</div>

				<div className='flex gap-2'>
					<Button
						variant='secondary'
						onClick={() => router.refresh()}>
						Retry
					</Button>

					<Button
						asChild
						variant='secondary'>
						<Link href='/dashboard'>Back</Link>
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className='container mx-auto p-4 md:p-6 space-y-12'>
			<div className='flex items-start justify-between gap-4 flex-wrap'>
				<div className='space-y-2'>
					<div className='flex items-center gap-3'>
						<div
							className='w-3.5 h-3.5 rounded-full'
							style={{ backgroundColor: deck.color }}
						/>

						<h1 className='text-2xl font-bold text-slate-900 dark:text-foreground'>
							{deck.title}
						</h1>
					</div>

					{deck.tags?.length ? (
						<div className='flex flex-wrap gap-2'>
							{deck.tags.map((t) => (
								<span
									key={t}
									className='text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200'>
									{t}
								</span>
							))}
						</div>
					) : null}
				</div>

				<div className='flex gap-2'>
					<Link href='/dashboard'>
						<Button variant='secondary'>
							<ChevronLeftIcon />
							Back
						</Button>
					</Link>

					<Link href={`/study?deckId=${deck.id}`}>
						<Button>
							<PlayCircleIcon />
							Study
						</Button>
					</Link>
				</div>
			</div>

			<div>
				<div className='text-sm font-semibold text-slate-700 dark:text-foreground mb-3'>
					Description
				</div>

				{deck.description.trim() === '' ? (
					<div className='text-slate-500 italic'>
						No description provided.
					</div>
				) : (
					<div className='prose prose-slate max-w-none'>
						<MarkdownLive value={deck.description ?? ''} />
					</div>
				)}
			</div>
		</div>
	)
}
