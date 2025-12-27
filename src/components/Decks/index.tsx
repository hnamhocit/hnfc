import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import { useDecks } from '@/hooks/useDecks'
import Empty from './Empty'
import GridDeck from './GridDeck'
import ListDeck from './ListDeck'
import LoadMore from './LoadMore'
import Toolbar from './Toolbar'

export default function Decks() {
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
	const [searchQuery, setSearchQuery] = useState('')

	const { decks, isLoading, isLoadingMore, hasMore, loadMore } = useDecks(20)

	const filteredDecks = useMemo(() => {
		const q = searchQuery.trim().toLowerCase()
		if (!q) return decks
		return decks.filter((deck) => deck.title.toLowerCase().includes(q))
	}, [decks, searchQuery])

	const showEmpty = !isLoading && filteredDecks.length === 0
	const showLoadMore = !isLoading && hasMore && searchQuery.trim() === ''

	return (
		<div className='container mx-auto p-4 md:p-6'>
			<Toolbar
				viewMode={viewMode}
				setViewMode={setViewMode}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>

			{isLoading ? (
				<div className='py-10 text-center text-slate-500'>
					Loading decks...
				</div>
			) : viewMode === 'grid' ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					<Link
						href='/decks/new'
						className='flex items-center justify-center border-2 border-dashed shadow rounded-xl min-h-50 dark:border-neutral-200 transition-colors hover:border-primary! hover:text-primary'>
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
				<div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden'>
					<table className='w-full text-left border-collapse'>
						<thead className='bg-slate-50 text-slate-500 text-sm border-b border-slate-200'>
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

						<tbody className='divide-y divide-slate-100'>
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

			{showLoadMore && (
				<LoadMore
					isLoadingMore={isLoadingMore}
					loadMore={loadMore}
				/>
			)}
		</div>
	)
}
