import Stat from './Stat'

const stats = [
	{ label: 'activeUsers', value: '10k+' },
	{ label: 'cardsReviewed', value: '1M+' },
	{ label: 'rating', value: '4.9/5' },
]

export default function Stats() {
	return (
		<div className='mt-10 grid grid-cols-3 gap-6 w-full max-w-lg border-t border-border pt-6'>
			{stats.map((stat) => (
				<Stat
					key={stat.label}
					{...stat}
				/>
			))}
		</div>
	)
}
