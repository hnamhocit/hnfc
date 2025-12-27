import { FilterIcon, LayoutGridIcon, ListIcon, SearchIcon } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

interface ToolbarProps {
	viewMode: 'grid' | 'list'
	setViewMode: Dispatch<SetStateAction<'grid' | 'list'>>
	searchQuery: string
	setSearchQuery: Dispatch<SetStateAction<string>>
}

export default function Toolbar({
	viewMode,
	setViewMode,
	searchQuery,
	setSearchQuery,
}: ToolbarProps) {
	return (
		<div className='bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between'>
			{/* Search Bar */}
			<div className='relative w-full md:w-96'>
				<SearchIcon
					className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
					size={18}
				/>

				<input
					type='text'
					placeholder='Search your decks...'
					className='w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-background transition-all'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			{/* View Options & Filters */}
			<div className='flex items-center gap-3 w-full md:w-auto justify-end'>
				<button className='flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium border border-transparent hover:border-slate-200'>
					<FilterIcon size={18} />
					<span>Filter</span>
				</button>

				<div className='h-6 w-px bg-slate-200 mx-1'></div>

				<div className='flex bg-slate-100 p-1 rounded-lg'>
					<button
						onClick={() => setViewMode('grid')}
						className={`p-2 rounded-md transition-all ${
							viewMode === 'grid'
								? 'bg-white shadow text-indigo-600'
								: 'text-slate-500 hover:text-slate-700'
						}`}
						title='Grid View'>
						<LayoutGridIcon size={18} />
					</button>

					<button
						onClick={() => setViewMode('list')}
						className={`p-2 rounded-md transition-all ${
							viewMode === 'list'
								? 'bg-white shadow text-indigo-600'
								: 'text-slate-500 hover:text-slate-700'
						}`}
						title='List View'>
						<ListIcon size={18} />
					</button>
				</div>
			</div>
		</div>
	)
}
