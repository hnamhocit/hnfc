'use client'

import type { FsrsRating, ICard } from '@/interfaces'
import { Timestamp } from 'firebase/firestore'
import { useMemo, useState } from 'react'

type SessionState = 'idle' | 'ready' | 'done'

function isDue(c: ICard, nowMs: number) {
	const dueAt = c.srs?.dueAt?.toMillis ? c.srs.dueAt.toMillis() : 0
	return dueAt <= nowMs
}

function nextDueAt(rating: FsrsRating) {
	const now = new Date()
	const minutes = (m: number) => new Date(now.getTime() + m * 60_000)
	const days = (d: number) => new Date(now.getTime() + d * 86_400_000)

	if (rating === 1) return Timestamp.fromDate(minutes(10))
	if (rating === 2) return Timestamp.fromDate(days(1))
	if (rating === 3) return Timestamp.fromDate(days(3))
	return Timestamp.fromDate(days(7))
}

export function useStudySession(cards: ICard[]) {
	const [state, setState] = useState<SessionState>('idle')
	const [index, setIndex] = useState(0)
	const [revealed, setRevealed] = useState(false)
	const [studied, setStudied] = useState(0)

	const queue = useMemo(() => {
		const nowMs = Date.now()
		const due = cards.filter((c) => isDue(c, nowMs))
		const other = cards.filter((c) => !isDue(c, nowMs))

		// MVP: due first, then others (optional)
		return [...due, ...other]
	}, [cards])

	const total = queue.length
	const current = total > 0 ? queue[Math.min(index, total - 1)] : null

	const progress = total ? Math.round((studied / total) * 100) : 0

	const start = () => {
		setState('ready')
		setIndex(0)
		setRevealed(false)
		setStudied(0)
	}

	const showAnswer = () => setRevealed(true)

	// returns updated card (for persistence)
	const rate = (rating: FsrsRating) => {
		if (!current) return null

		const now = Timestamp.now()
		const updated: ICard = {
			...current,
			srs: {
				...current.srs,
				// basic counters
				reps: (current.srs?.reps ?? 0) + 1,
				lapses: (current.srs?.lapses ?? 0) + (rating === 1 ? 1 : 0),
				lastReviewAt: now,
				dueAt: nextDueAt(rating),
				// MVP state mapping:
				state: rating === 1 ? 'learning' : 'review',
			},
			updatedAt: now,
		}

		const nextIndex = index + 1
		setStudied((x) => x + 1)
		setIndex(nextIndex)
		setRevealed(false)

		if (nextIndex >= total) {
			setState('done')
		}

		return updated
	}

	return {
		state,
		start,
		current,
		index,
		total,
		studied,
		progress,
		revealed,
		showAnswer,
		rate,
	}
}
