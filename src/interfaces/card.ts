import { Timestamp } from 'firebase/firestore'
import { IDocument } from './document'

export type CardType = 'forward' | 'reverse' | 'typing' | 'cloze'

export type FsrsRating = 1 | 2 | 3 | 4
export type CardState = 'new' | 'learning' | 'review' | 'relearning'

export interface FsrsState {
	state: CardState
	difficulty: number
	stability: number
	dueAt: Timestamp
	lastReviewAt?: Timestamp
	reps: number
	lapses: number
}

export interface ICard extends IDocument {
	deckId: string

	type: CardType

	front: string
	back: string

	srs: FsrsState
}
