const tags = [
	'Computer Science',
	'Medical',
	'Law',
	'Languages',
	'History',
	'Geography',
]

export default function Tags() {
	return (
		<section className='container mx-auto pb-20 px-4'>
			<div className='flex flex-wrap justify-center gap-3 opacity-70 grayscale hover:grayscale-0 transition-all duration-500'>
				{tags.map((t) => (
					<div
						key={t}
						className='px-4 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground'>
						{t}
					</div>
				))}
			</div>
		</section>
	)
}
