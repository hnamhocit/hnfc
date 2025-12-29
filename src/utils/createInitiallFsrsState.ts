import type { FsrsState } from '@/interfaces'
import { Timestamp } from 'firebase/firestore'

export function createInitialFsrsState(): FsrsState {
	return {
		state: 'new',
		difficulty: 5.0,
		stability: 0.0,
		dueAt: Timestamp.now(),
		lastReviewAt: null,
		reps: 0,
		lapses: 0,
	}
}
