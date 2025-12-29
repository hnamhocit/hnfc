import dayjs from 'dayjs'

import { IDeckWithStats } from '@/interfaces'
import { ClockIcon } from 'lucide-react'
import Link from 'next/link'
import MoreMenu from '../MoreMenu'

export default function ListDeck({
	id,
	title,
	color,
	progress,
	dueCards,
	updatedAt,
	totalCards,
}: IDeckWithStats) {
	return (
		<tr className='hover:bg-slate-50 transition-colors group'>
			<td className='py-4 px-6'>
				<div className='flex items-center gap-3'>
					<div
						className='w-3 h-3 rounded-full'
						style={{
							backgroundColor: color,
						}}
					/>

					<Link
						href={`/decks/${id}`}
						className='font-semibold text-slate-800 hover:text-primary transition-colors line-clamp-1'>
						{title}
					</Link>
				</div>
			</td>

			<td className='py-4 px-6 text-slate-600'>{totalCards}</td>

			<td className='py-4 px-6'>
				{dueCards > 0 ? (
					<span className='text-orange-600 bg-orange-50 px-2 py-1 rounded text-xs font-bold border border-orange-100'>
						{dueCards} cards
					</span>
				) : (
					<span className='text-emerald-600 text-sm flex items-center gap-1'>
						All done
					</span>
				)}
			</td>

			<td className='py-4 px-6 text-slate-500 text-sm hidden md:table-cell'>
				<div className='flex items-center gap-1'>
					<ClockIcon size={14} />{' '}
					{dayjs(updatedAt.toDate()).format('MMM D, YYYY')}
				</div>
			</td>

			<td className='py-4 px-6 hidden sm:table-cell w-32'>
				<div className='w-full bg-slate-100 rounded-full h-1.5'>
					<div
						style={{
							width: `${progress}%`,
							height: '100%',
							backgroundColor: color,
						}}
					/>
				</div>
			</td>

			<td className='py-4 px-6 text-right'>
				<Link href={`/decks/${id}/study`}>
					<button
						type='button'
						className='text-indigo-600 hover:text-indigo-800 font-medium text-sm mr-4 opacity-0 group-hover:opacity-100 transition-opacity'>
						Study
					</button>
				</Link>

				<MoreMenu id={id} />
			</td>
		</tr>
	)
}
