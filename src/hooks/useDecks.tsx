import {
	collection,
	db,
	DocumentData,
	getDocs,
	limit,
	orderBy,
	query,
	QueryDocumentSnapshot,
	startAfter,
	where,
	type QueryConstraint,
} from '@/config'
import type { IDeck, IDeckWithStats } from '@/interfaces'
import { deckService } from '@/services'
import { useUserStore } from '@/stores'
import { useCallback, useEffect, useState } from 'react'

type UseDecksResult = {
	decks: IDeckWithStats[]
	isLoading: boolean
	isLoadingMore: boolean
	loadMore: () => Promise<void>
	hasMore: boolean
}

export const useDecks = (pageSize: number): UseDecksResult => {
	const { user } = useUserStore()
	const uid = user?.id ?? null

	const [decks, setDecks] = useState<IDeckWithStats[]>([])
	const [hasMore, setHasMore] = useState(false)
	const [nextCursor, setNextCursor] =
		useState<QueryDocumentSnapshot<DocumentData> | null>(null)

	const [isLoading, setIsLoading] = useState(false)
	const [isLoadingMore, setIsLoadingMore] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const fetchPage = useCallback(
		async (cursor?: QueryDocumentSnapshot<DocumentData> | null) => {
			if (!uid) return { items: [] as IDeckWithStats[], next: null }

			const constraints: QueryConstraint[] = [
				where('ownerId', '==', uid),
				orderBy('createdAt', 'desc'),
				orderBy('__name__', 'desc'),
				limit(pageSize),
			]

			if (cursor) constraints.push(startAfter(cursor))

			const q = query(collection(db, 'decks'), ...constraints)
			const snap = await getDocs(q)

			const rawDecks = snap.docs.map(
				(d) => ({ id: d.id, ...(d.data() as any) } as IDeck),
			)

			const withStats = await deckService.getDecksWithStats(rawDecks)

			const hasMore = snap.docs.length === pageSize
			const next = hasMore ? snap.docs[snap.docs.length - 1] : null

			return { items: withStats, next, hasMore }
		},
		[uid, pageSize],
	)

	const refresh = useCallback(async () => {
		if (!uid) {
			console.log('Here')
			setDecks([])
			setNextCursor(null)
			setError(null)
			return
		}

		setIsLoading(true)
		setError(null)

		try {
			const { items, next, hasMore } = await fetchPage(null)
			setDecks(items)
			setNextCursor(next)
			setHasMore(hasMore!)
		} catch (e: any) {
			setError(e?.message ?? 'Failed to load decks')
		} finally {
			setIsLoading(false)
		}
	}, [uid, fetchPage])

	const loadMore = useCallback(async () => {
		// ✅ anti-spam + phải có cursor
		if (!uid || !nextCursor || isLoadingMore) return

		setIsLoadingMore(true)
		setError(null)
		try {
			const { items, next, hasMore } = await fetchPage(nextCursor)
			setDecks((prev) => [...prev, ...items])
			setNextCursor(next)
			setHasMore(hasMore!)
		} catch (e: any) {
			setError(e?.message ?? 'Failed to load more decks')
		} finally {
			setIsLoadingMore(false)
		}
	}, [uid, nextCursor, isLoadingMore, fetchPage])

	useEffect(() => {
		refresh()
	}, [refresh])

	return {
		decks,
		hasMore,
		isLoading,
		isLoadingMore,
		loadMore,
	}
}
