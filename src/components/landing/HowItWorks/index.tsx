import { LayersIcon, PlayIcon, StarIcon } from 'lucide-react'

const howItWorkds = [
	{
		step: '1',
		title: 'Create',
		desc: 'Add cards manually or import from CSV.',
		icon: <LayersIcon />,
	},
	{
		step: '2',
		title: 'Review',
		desc: 'Short daily sessions using smart recall.',
		icon: <PlayIcon />,
	},
	{
		step: '3',
		title: 'Master',
		desc: 'Track progress and refine weak areas.',
		icon: <StarIcon />,
	},
]

export default function HowItWorks() {
	return (
		<section
			id='how'
			className='container mx-auto py-24 px-4'>
			<div className='text-center max-w-3xl mx-auto mb-16'>
				<h2 className='text-3xl font-bold tracking-tight mb-4'>
					How it works
				</h2>

				<p className='text-lg text-muted-foreground'>
					Three simple steps to get into a daily learning groove.
				</p>
			</div>

			<div className='grid gap-8 md:grid-cols-3 relative'>
				{/* Connecting Line (Desktop) */}
				<div className='hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-linear-to-r from-transparent via-border to-transparent -z-10' />

				{howItWorkds.map((x, i) => (
					<div
						key={i}
						className='flex flex-col items-center text-center'>
						<div className='relative w-24 h-24 rounded-full bg-background border-4 border-muted flex items-center justify-center mb-6 shadow-sm z-10'>
							<div className='w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center'>
								{x.icon}
							</div>

							<div className='absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm border-4 border-background'>
								{x.step}
							</div>
						</div>

						<h3 className='text-xl font-bold mb-2'>{x.title}</h3>

						<p className='text-muted-foreground max-w-xs'>
							{x.desc}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}
