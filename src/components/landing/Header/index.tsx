import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
	return (
		<header className='sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60'>
			<div className='container mx-auto flex h-16 items-center justify-between px-4'>
				<Link
					href='/'
					className='flex items-center gap-3 group'>
					<div className='relative h-9 w-9 overflow-hidden rounded-xl shadow-sm group-hover:shadow-primary/20 transition-all'>
						<Image
							src='/logo.png'
							alt='hnfc'
							fill
							className='object-cover'
						/>
					</div>

					<div className='leading-tight'>
						<div className='text-sm font-bold tracking-tight'>
							hnfc
						</div>

						<div className='text-[10px] text-muted-foreground'>
							Flashcards, made simple
						</div>
					</div>
				</Link>

				<nav className='hidden md:flex items-center gap-8'>
					{['Features', 'How it works', 'Use cases', 'Pricing'].map(
						(item) => (
							<a
								key={item}
								href={`#${item
									.toLowerCase()
									.replace(/\s+/g, '-')}`}
								className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors'>
								{item}
							</a>
						),
					)}
				</nav>

				<div className='flex items-center gap-3'>
					<Button
						variant='ghost'
						asChild
						className='hidden sm:inline-flex'>
						<Link href='/enter'>Sign in</Link>
					</Button>

					<Button
						asChild
						className='bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20'>
						<Link href='/enter'>Get started</Link>
					</Button>
				</div>
			</div>
		</header>
	)
}
