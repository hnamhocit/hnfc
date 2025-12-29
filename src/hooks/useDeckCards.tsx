import type { ICard } from '@/interfaces'
import { cardService } from '@/services'
import { useCallback, useEffect, useState } from 'react'

type LoadState = 'idle' | 'loading' | 'ready' | 'error'

export function useDeckCards(deckId: string | null) {
	const [state, setState] = useState<LoadState>('idle')
	const [cards, setCards] = useState<ICard[]>([])
	const [error, setError] = useState('')

	const refresh = useCallback(async () => {
		if (!deckId) return
		setState('loading')
		setError('')

		try {
			const items = await cardService.listByDeck(deckId)
			setCards(items)
			setState('ready')
		} catch (e: any) {
			setError(e?.message ?? 'Failed to load cards')
			setState('error')
		}
	}, [deckId])

	useEffect(() => {
		refresh()
	}, [refresh])

	return { state, cards, error, refresh, setCards }
}
