import Link from 'next/link'

export default function LegalFooter() {
	return (
		<footer className='mt-10 text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
			<div>© {new Date().getFullYear()} hnfc</div>
			<div className='flex gap-3'>
				<Link
					className='hover:underline'
					href='/privacy'>
					Privacy
				</Link>

				<Link
					className='hover:underline'
					href='/terms'>
					Terms
				</Link>

				<Link
					className='hover:underline'
					href='/delete-account'>
					Data Deletion
				</Link>
			</div>
		</footer>
	)
}
