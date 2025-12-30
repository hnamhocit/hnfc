import Left from './Left'
import Right from './Right'

export default function Hero() {
	return (
		<section className='relative pt-20 pb-32 overflow-hidden'>
			<div className='container mx-auto px-4'>
				<div className='grid items-center gap-12 lg:grid-cols-2'>
					<Left />

					<Right />
				</div>
			</div>
		</section>
	)
}
