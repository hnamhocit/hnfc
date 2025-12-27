import { SearchIcon } from 'lucide-react'

export default function Empty() {
	return (
		<div className='text-center py-20'>
			<div className='bg-slate-100 p-4 rounded-full w-fit mx-auto mb-4 text-slate-400'>
				<SearchIcon size={32} />
			</div>

			<h3 className='text-lg font-semibold text-slate-700'>
				No decks found
			</h3>

			<p className='text-slate-500'>
				Try adjusting your search or create a new deck.
			</p>
		</div>
	)
}
