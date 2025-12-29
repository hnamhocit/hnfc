import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import { useDecks } from '@/hooks/useDecks'
import WarningAlert from '../WarningAlert'
import Empty from './Empty'
import GridDeck from './GridDeck'
import ListDeck from './ListDeck'
import Toolbar from './Toolbar'

export default function Decks() {
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
	const [searchQuery, setSearchQuery] = useState('')

	const { decks, isLoading, error, refresh } = useDecks()

	const filteredDecks = useMemo(() => {
		const q = searchQuery.trim().toLowerCase()
		if (!q) return decks
		return decks.filter((d) => d.title.toLowerCase().includes(q))
	}, [decks, searchQuery])

	const showEmpty = !isLoading && filteredDecks.length === 0

	return (
		<div className='container mx-auto p-4 md:p-6 space-y-6'>
			<WarningAlert />

			<Toolbar
				viewMode={viewMode}
				setViewMode={setViewMode}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>

			{/* Error state */}
			{error ? (
				<div className='rounded-xl border border-border bg-card p-4 flex items-center justify-between gap-3'>
					<div>
						<div className='text-sm font-medium text-destructive'>
							Failed to load decks
						</div>
						<div className='text-sm text-muted-foreground mt-1'>
							{error}
						</div>
					</div>

					<button
						type='button'
						onClick={refresh}
						className='text-sm font-semibold text-primary hover:underline'>
						Retry
					</button>
				</div>
			) : null}

			{/* Loading */}
			{isLoading ? (
				<div className='py-10 text-center text-muted-foreground'>
					Loading decks...
				</div>
			) : viewMode === 'grid' ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					<Link
						href='/decks/new'
						className='flex items-center justify-center border-2 border-dashed shadow rounded-xl min-h-50 border-border transition-colors hover:border-primary hover:text-primary bg-card'>
						<PlusIcon
							size={48}
							className='transition'
						/>
					</Link>

					{filteredDecks.map((deck) => (
						<GridDeck
							key={deck.id}
							{...deck}
						/>
					))}
				</div>
			) : (
				<div className='rounded-xl border border-border bg-card shadow-sm overflow-hidden'>
					<table className='w-full text-left border-collapse'>
						<thead className='bg-muted/40 text-muted-foreground text-sm border-b border-border'>
							<tr>
								<th className='py-4 px-6 font-medium'>
									Deck Name
								</th>
								<th className='py-4 px-6 font-medium'>Cards</th>
								<th className='py-4 px-6 font-medium'>
									Due Today
								</th>
								<th className='py-4 px-6 font-medium hidden md:table-cell'>
									Last Studied
								</th>
								<th className='py-4 px-6 font-medium hidden sm:table-cell'>
									Progress
								</th>
								<th className='py-4 px-6 font-medium text-right'>
									Actions
								</th>
							</tr>
						</thead>

						<tbody className='divide-y divide-border'>
							{filteredDecks.map((deck) => (
								<ListDeck
									key={deck.id}
									{...deck}
								/>
							))}
						</tbody>
					</table>
				</div>
			)}

			{showEmpty && <Empty />}
		</div>
	)
}
