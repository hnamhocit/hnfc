'use client'

import { EyeIcon, RotateCcwIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type CardType = 'forward' | 'reverse' | 'typing'
type CardState = 'new' | 'learning' | 'review' | 'relearning'
type FsrsRating = 1 | 2 | 3 | 4

type FsrsState = {
	state: CardState
	difficulty: number
	stability: number
	dueAt: Date
	lastReviewAt?: Date
	reps: number
	lapses: number
}

type Card = {
	id: string
	deckId: string
	type: CardType
	front: string
	back: string
	srs: FsrsState
}

type ReviewLog = {
	cardId: string
	type: CardType
	rating: FsrsRating
	before: FsrsState
	after: FsrsState
	ts: Date
}

function clamp(n: number, min: number, max: number) {
	return Math.max(min, Math.min(max, n))
}

function addMinutes(d: Date, mins: number) {
	return new Date(d.getTime() + mins * 60_000)
}
function addDays(d: Date, days: number) {
	return new Date(d.getTime() + days * 24 * 60 * 60_000)
}

/**
 * Demo FSRS-like (không phải FSRS chuẩn):
 * - rating 1 (Again): tăng lapses, giảm stability, due sớm (10m), state=relearning
 * - rating 2 (Hard): tăng nhẹ stability, due ngắn (1d), difficulty tăng
 * - rating 3 (Good): tăng ổn stability, due theo stability (min 2d)
 * - rating 4 (Easy): tăng mạnh stability, due dài hơn, difficulty giảm
 */
function computeNextSrs(
	now: Date,
	prev: FsrsState,
	rating: FsrsRating,
): FsrsState {
	const before = prev

	const reps = before.reps + 1
	let lapses = before.lapses
	let state: CardState = before.state

	let difficulty = before.difficulty
	let stability = before.stability
	let dueAt = before.dueAt

	if (rating === 1) {
		lapses += 1
		state = 'relearning'
		difficulty = clamp(difficulty + 0.8, 1, 10)
		stability = clamp(stability * 0.6, 0.2, 365)
		dueAt = addMinutes(now, 10)
	}

	if (rating === 2) {
		state = before.state === 'new' ? 'learning' : before.state
		difficulty = clamp(difficulty + 0.3, 1, 10)
		stability = clamp(stability * 1.15, 0.2, 365)
		dueAt = addDays(now, 1)
	}

	if (rating === 3) {
		state = 'review'
		difficulty = clamp(difficulty + 0.05, 1, 10)
		stability = clamp(stability * 1.35, 0.2, 365)
		// due ~ max(2 ngày, stability ngày)
		dueAt = addDays(now, Math.max(2, Math.round(stability)))
	}

	if (rating === 4) {
		state = 'review'
		difficulty = clamp(difficulty - 0.25, 1, 10)
		stability = clamp(stability * 1.6, 0.2, 365)
		dueAt = addDays(now, Math.max(4, Math.round(stability * 1.2)))
	}

	return {
		state,
		difficulty: Number(difficulty.toFixed(2)),
		stability: Number(stability.toFixed(2)),
		dueAt,
		lastReviewAt: now,
		reps,
		lapses,
	}
}

function format(dt: Date) {
	return dt.toLocaleString()
}

function makeFakeCards(now: Date): Card[] {
	// 6 cards đủ để demo
	const raw = [
		{ front: 'Paris', back: 'France' },
		{ front: 'HTTP 404', back: 'Not Found' },
		{ front: 'Polymorphism', back: 'One interface, many implementations' },
		{ front: 'O(1)', back: 'Constant time' },
		{ front: 'Anemia', back: 'Low hemoglobin' },
		{ front: 'TLS', back: 'Transport Layer Security' },
	]

	const cards: Card[] = [
		// forward
		{
			id: 'c1',
			deckId: 'demo',
			type: 'forward',
			front: raw[0].front,
			back: raw[0].back,
			srs: {
				state: 'new',
				difficulty: 5.2,
				stability: 1.2,
				dueAt: addMinutes(now, -5),
				reps: 0,
				lapses: 0,
			},
		},
		// reverse
		{
			id: 'c2',
			deckId: 'demo',
			type: 'reverse',
			front: raw[1].back,
			back: raw[1].front,
			srs: {
				state: 'learning',
				difficulty: 6.0,
				stability: 3.0,
				dueAt: addMinutes(now, -20),
				reps: 3,
				lapses: 1,
			},
		},
		// typing
		{
			id: 'c3',
			deckId: 'demo',
			type: 'typing',
			front: raw[2].front,
			back: raw[2].back,
			srs: {
				state: 'review',
				difficulty: 4.1,
				stability: 7.0,
				dueAt: addMinutes(now, -60),
				reps: 8,
				lapses: 0,
			},
		},
		// forward
		{
			id: 'c4',
			deckId: 'demo',
			type: 'forward',
			front: raw[3].front,
			back: raw[3].back,
			srs: {
				state: 'review',
				difficulty: 3.6,
				stability: 12.0,
				dueAt: addMinutes(now, -8),
				reps: 10,
				lapses: 0,
			},
		},
		// reverse
		{
			id: 'c5',
			deckId: 'demo',
			type: 'reverse',
			front: raw[4].back,
			back: raw[4].front,
			srs: {
				state: 'learning',
				difficulty: 6.8,
				stability: 2.1,
				dueAt: addMinutes(now, -3),
				reps: 2,
				lapses: 0,
			},
		},
		// typing
		{
			id: 'c6',
			deckId: 'demo',
			type: 'typing',
			front: raw[5].front,
			back: raw[5].back,
			srs: {
				state: 'new',
				difficulty: 5.7,
				stability: 0.9,
				dueAt: addMinutes(now, -15),
				reps: 0,
				lapses: 0,
			},
		},
	]

	return cards
}

export default function StudyPage() {
	const now = useMemo(() => new Date(), [])
	const [queue, setQueue] = useState<Card[]>([])
	const [index, setIndex] = useState(0)

	const [revealed, setRevealed] = useState(false)
	const [typed, setTyped] = useState('')
	const [log, setLog] = useState<ReviewLog[]>([])

	const active = queue[index] ?? null
	const remaining = Math.max(0, queue.length - index)

	const stats = useMemo(() => {
		const total = log.length
		const again = log.filter((x) => x.rating === 1).length
		const hard = log.filter((x) => x.rating === 2).length
		const good = log.filter((x) => x.rating === 3).length
		const easy = log.filter((x) => x.rating === 4).length
		return { total, again, hard, good, easy }
	}, [log])

	useEffect(() => {
		// fake “load due cards”
		setQueue(makeFakeCards(now))
	}, [now])

	useEffect(() => {
		// reset UI state when card changes
		setRevealed(false)
		setTyped('')
	}, [index])

	const showAnswer = () => setRevealed(true)

	const rate = (rating: FsrsRating) => {
		if (!active) return

		// typing: yêu cầu submit/reveal trước khi rate
		if (active.type === 'typing' && !revealed) return

		const ts = new Date()
		const before = active.srs
		const after = computeNextSrs(ts, before, rating)

		// update card in queue (demo “persist”)
		setQueue((prev) => {
			const next = [...prev]
			next[index] = { ...active, srs: after }
			return next
		})

		setLog((prev) => [
			...prev,
			{ cardId: active.id, type: active.type, rating, before, after, ts },
		])

		// advance
		setIndex((i) => i + 1)
	}

	const restart = () => {
		setQueue(makeFakeCards(new Date()))
		setIndex(0)
		setRevealed(false)
		setTyped('')
		setLog([])
	}

	return (
		<div className='container mx-auto max-w-5xl p-4 md:p-6 space-y-6'>
			{/* Top bar */}
			<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
				<div>
					<h1 className='text-2xl font-bold text-foreground'>
						Study
					</h1>
					<div className='text-sm text-muted-foreground'>
						Demo session with fake data (FSRS-like scheduling).
					</div>
				</div>

				<div className='flex items-center gap-2'>
					<div className='text-sm text-muted-foreground'>
						Remaining:{' '}
						<span className='text-foreground font-medium'>
							{remaining}
						</span>
					</div>

					<Button
						variant='secondary'
						onClick={restart}>
						<RotateCcwIcon className='mr-2 h-4 w-4' />
						Restart demo
					</Button>
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Card */}
				<div className='lg:col-span-2'>
					<div className='rounded-2xl border border-border bg-card shadow-sm p-6 space-y-5'>
						{!active ? (
							<div className='py-16 text-center space-y-2'>
								<div className='text-xl font-semibold text-foreground'>
									Session complete
								</div>
								<div className='text-muted-foreground text-sm'>
									You reviewed {stats.total} cards.
								</div>
								<div className='pt-4'>
									<Button onClick={restart}>
										Start again
									</Button>
								</div>
							</div>
						) : (
							<>
								{/* Meta */}
								<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
									<div className='text-sm'>
										<span className='text-muted-foreground'>
											Type:{' '}
										</span>
										<span className='font-medium text-foreground'>
											{active.type}
										</span>
										<span className='text-muted-foreground'>
											{' '}
											· State:{' '}
										</span>
										<span className='font-medium text-foreground'>
											{active.srs.state}
										</span>
									</div>

									<div className='text-xs text-muted-foreground'>
										Due: {format(active.srs.dueAt)}
									</div>
								</div>

								{/* Prompt */}
								<div className='rounded-2xl border border-border bg-background/40 p-6'>
									<div className='text-xs uppercase tracking-wide text-muted-foreground'>
										Prompt
									</div>
									<div className='mt-2 text-2xl font-semibold text-foreground break-words'>
										{active.front}
									</div>
								</div>

								{/* Answer area */}
								{active.type === 'typing' ? (
									<div className='space-y-2'>
										<Label>Your answer</Label>
										<Input
											value={typed}
											onChange={(e) =>
												setTyped(e.target.value)
											}
											placeholder='Type and then reveal to compare...'
										/>
										<div className='flex items-center justify-between gap-3'>
											<Button
												variant='secondary'
												onClick={showAnswer}
												disabled={revealed}>
												<EyeIcon className='mr-2 h-4 w-4' />
												Reveal answer
											</Button>

											{revealed ? (
												<div className='text-sm'>
													<span className='text-muted-foreground'>
														Expected:{' '}
													</span>
													<span className='text-foreground font-medium'>
														{active.back}
													</span>
												</div>
											) : null}
										</div>
									</div>
								) : (
									<div className='space-y-3'>
										{!revealed ? (
											<Button
												onClick={showAnswer}
												variant='secondary'>
												<EyeIcon className='mr-2 h-4 w-4' />
												Show answer
											</Button>
										) : (
											<div className='rounded-2xl border border-border bg-background/40 p-6'>
												<div className='text-xs uppercase tracking-wide text-muted-foreground'>
													Answer
												</div>
												<div className='mt-2 text-xl font-semibold text-foreground break-words'>
													{active.back}
												</div>
											</div>
										)}
									</div>
								)}

								{/* Rating */}
								<div className='pt-2 border-t border-border'>
									<div className='text-sm text-muted-foreground mb-3'>
										Rate your recall (1–4)
									</div>

									<div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
										<Button
											variant='destructive'
											onClick={() => rate(1)}
											disabled={
												active.type !== 'typing'
													? !revealed
													: !revealed
											}>
											1 · Again
										</Button>
										<Button
											variant='secondary'
											onClick={() => rate(2)}
											disabled={
												active.type !== 'typing'
													? !revealed
													: !revealed
											}>
											2 · Hard
										</Button>
										<Button
											onClick={() => rate(3)}
											disabled={
												active.type !== 'typing'
													? !revealed
													: !revealed
											}>
											3 · Good
										</Button>
										<Button
											variant='outline'
											onClick={() => rate(4)}
											disabled={
												active.type !== 'typing'
													? !revealed
													: !revealed
											}>
											4 · Easy
										</Button>
									</div>

									{/* SRS debug */}
									<div className='mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs'>
										<Info
											label='Difficulty'
											value={String(
												active.srs.difficulty,
											)}
										/>
										<Info
											label='Stability'
											value={String(active.srs.stability)}
										/>
										<Info
											label='Reps'
											value={String(active.srs.reps)}
										/>
										<Info
											label='Lapses'
											value={String(active.srs.lapses)}
										/>
									</div>
								</div>
							</>
						)}
					</div>
				</div>

				{/* Sidebar */}
				<div className='space-y-6'>
					<div className='rounded-2xl border border-border bg-card p-5 shadow-sm'>
						<div className='font-semibold text-foreground'>
							Session stats
						</div>
						<div className='mt-3 space-y-2 text-sm'>
							<Row
								k='Reviewed'
								v={String(stats.total)}
							/>
							<Row
								k='Again'
								v={String(stats.again)}
							/>
							<Row
								k='Hard'
								v={String(stats.hard)}
							/>
							<Row
								k='Good'
								v={String(stats.good)}
							/>
							<Row
								k='Easy'
								v={String(stats.easy)}
							/>
						</div>
					</div>

					<div className='rounded-2xl border border-border bg-card p-5 shadow-sm'>
						<div className='font-semibold text-foreground'>
							Review log
						</div>
						<div className='mt-3 space-y-3 max-h-[420px] overflow-auto pr-1'>
							{log.length === 0 ? (
								<div className='text-sm text-muted-foreground'>
									Rate cards to see updates.
								</div>
							) : (
								log
									.slice()
									.reverse()
									.map((x) => (
										<div
											key={`${
												x.cardId
											}-${x.ts.getTime()}`}
											className='rounded-xl border border-border bg-background/40 p-3'>
											<div className='flex items-center justify-between text-xs text-muted-foreground'>
												<div>
													<span className='font-medium text-foreground'>
														{x.cardId}
													</span>{' '}
													· {x.type}
												</div>
												<div>{format(x.ts)}</div>
											</div>

											<div className='mt-2 text-xs grid grid-cols-2 gap-2'>
												<div>
													<div className='text-muted-foreground'>
														Before due
													</div>
													<div className='text-foreground font-medium'>
														{format(x.before.dueAt)}
													</div>
												</div>
												<div>
													<div className='text-muted-foreground'>
														After due
													</div>
													<div className='text-foreground font-medium'>
														{format(x.after.dueAt)}
													</div>
												</div>
											</div>

											<div className='mt-2 text-xs text-muted-foreground'>
												Rating:{' '}
												<span className='text-foreground font-medium'>
													{x.rating}
												</span>{' '}
												· diff {x.before.difficulty}→
												{x.after.difficulty} · stab{' '}
												{x.before.stability}→
												{x.after.stability}
											</div>
										</div>
									))
							)}
						</div>
					</div>
				</div>
			</div>

			<div className='text-xs text-muted-foreground'>
				This is a demo scheduler to visualize the flow. Replace{' '}
				<span className='font-medium text-foreground'>
					computeNextSrs()
				</span>{' '}
				with real FSRS later.
			</div>
		</div>
	)
}

function Row({ k, v }: { k: string; v: string }) {
	return (
		<div className='flex items-center justify-between'>
			<div className='text-muted-foreground'>{k}</div>
			<div className='font-medium text-foreground'>{v}</div>
		</div>
	)
}

function Info({ label, value }: { label: string; value: string }) {
	return (
		<div className='rounded-xl border border-border bg-background/40 p-3'>
			<div className='text-muted-foreground'>{label}</div>
			<div className='text-foreground font-semibold'>{value}</div>
		</div>
	)
}
