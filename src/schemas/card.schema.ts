import { z } from 'zod'

export const cardSchema = z.object({
	deckId: z.string().min(1, 'Please select a deck.'),
	front: z.string().trim().min(1, 'Front is required.'),
	back: z.string().trim().min(1, 'Back is required.'),
})

export type CardValues = z.infer<typeof cardSchema>
export type StudyMode = 'basic' | 'reverse' | 'typing'
