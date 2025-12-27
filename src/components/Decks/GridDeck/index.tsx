import { LayersIcon, PlayCircleIcon } from 'lucide-react'
import { motion } from 'motion/react'

import { IDeckWithStats } from '@/interfaces'
import Link from 'next/link'
import MoreMenu from '../MoreMenu'

export default function GridDeck({
	id,
	color,
	title,
	totalCards,
	dueCards,
	progress,
}: IDeckWithStats) {
	return (
		<div className='bg-white rounded-xl border border-neutral-200 dark:border-neutral-500 shadow-sm hover:shadow-md transition-all group flex flex-col overflow-hidden'>
			<div
				className='h-2'
				style={{ backgroundColor: color }}
			/>

			<div className='p-5 flex-1 flex flex-col gap-4'>
				<div className='flex justify-between items-start'>
					<Link
						href={`/decks/${id}`}
						className='font-bold text-lg text-slate-800 line-clamp-2 hover:text-primary transition-colors'
						title={title}>
						{title}
					</Link>

					<MoreMenu id={id} />
				</div>

				<div className='flex items-center gap-4 text-sm text-slate-500'>
					<span className='flex items-center gap-1'>
						<LayersIcon size={14} /> {totalCards} cards
					</span>

					<span className='flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full text-xs font-semibold'>
						{dueCards} due
					</span>
				</div>

				<div className='mt-auto space-y-2'>
					<div className='flex justify-between text-xs text-slate-500'>
						<span>Mastery</span>
						<span>{progress}%</span>
					</div>

					<div className='w-full bg-slate-100 rounded-full h-2 overflow-hidden'>
						<div
							className='h-full opacity-80'
							style={{
								width: `${progress}%`,
								backgroundColor: color,
							}}
						/>
					</div>
				</div>

				<motion.button
					whileTap={{ scale: 0.95 }}
					whileHover={{ scale: 1.02 }}
					className='flex items-center gap-3 justify-center py-2 px-3 rounded-md shadow text-white font-medium'
					style={{ backgroundColor: color }}>
					<PlayCircleIcon size={18} />
					Study Now
				</motion.button>
			</div>
		</div>
	)
}
