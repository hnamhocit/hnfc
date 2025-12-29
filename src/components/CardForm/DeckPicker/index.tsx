'use client'

import { useEffect, useState } from 'react'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { deckService } from '@/services'
import { useDeckOptionsStore, useUserStore } from '@/stores'

interface DeckPickerProps {
	value: string | null
	onChange: (deckId: string) => void
}

export default function DeckPicker({ value, onChange }: DeckPickerProps) {
	const { options, loaded, setOptions } = useDeckOptionsStore()
	const { user } = useUserStore()
	const uid = user?.id ?? null

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!uid) return

		if (loaded) return

		let alive = true
		setLoading(true)
		;(async () => {
			const decks = await deckService.findMany()
			if (!alive) return
			setOptions(decks)
			setLoading(false)
		})()

		return () => {
			alive = false
		}
	}, [uid, loaded, setOptions])

	const disabled = !uid || loading || !loaded || options.length === 0

	return (
		<Select
			value={value ?? ''}
			onValueChange={onChange}
			disabled={disabled}>
			<SelectTrigger className='h-11'>
				<SelectValue
					placeholder={
						!uid
							? 'Please sign in'
							: loading || !loaded
							? 'Loading decks...'
							: options.length === 0
							? 'No decks yet'
							: 'Select a deck'
					}
				/>
			</SelectTrigger>

			<SelectContent>
				{options.map((d) => (
					<SelectItem
						key={d.id}
						value={d.id}>
						{d.title}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
