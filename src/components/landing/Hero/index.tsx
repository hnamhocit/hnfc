import { ArrowRight, CheckCircle2, Keyboard } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import FeatureBadge from './FeatureBadge'

export default function Hero() {
	return (
		<section className='relative pt-20 pb-32 overflow-hidden'>
			<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none'>
				<div className='absolute top-[-10%] left-[-10%] w-150 h-150 bg-primary/20 rounded-full blur-[120px] opacity-40 mix-blend-multiply dark:opacity-20' />
				<div className='absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-fuchsia-400/20 rounded-full blur-[120px] opacity-40 mix-blend-multiply dark:opacity-20' />
			</div>

			<div className='container mx-auto px-4'>
				<div className='grid items-center gap-12 lg:grid-cols-2'>
					<div className='flex flex-col items-start text-left animate-in fade-in slide-in-from-bottom-4 duration-700'>
						<div className='flex flex-wrap gap-2 mb-6'>
							<FeatureBadge>Minimal</FeatureBadge>
							<FeatureBadge>Fast reviews</FeatureBadge>
							<FeatureBadge>Cross-platform</FeatureBadge>
						</div>

						<h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6'>
							Learn faster with <br className='hidden lg:block' />
							<span className='text-transparent bg-clip-text bg-linear-to-r from-primary via-purple-500 to-fuchsia-500'>
								intelligent flashcards.
							</span>
						</h1>

						<p className='max-w-xl text-lg text-muted-foreground mb-8 leading-relaxed'>
							hnfc is a cross-platform app designed for focus.
							Create decks instantly, review with spaced
							repetition, and build lasting memory—without the
							clutter.
						</p>

						<div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
							<Button
								size='lg'
								asChild
								className='text-base px-8 h-12 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20'>
								<Link href='/enter'>
									Start Learning Free{' '}
									<ArrowRight className='ml-2 w-4 h-4' />
								</Link>
							</Button>

							<Button
								size='lg'
								variant='outline'
								asChild
								className='text-base px-8 h-12 border-primary/20 hover:bg-primary/5'>
								<Link href='#features'>See Features</Link>
							</Button>
						</div>

						<div className='mt-10 grid grid-cols-3 gap-6 w-full max-w-lg border-t border-border pt-6'>
							<div>
								<div className='text-2xl font-bold text-foreground'>
									10k+
								</div>

								<div className='text-xs font-medium text-muted-foreground uppercase tracking-wide mt-1'>
									Active Users
								</div>
							</div>

							<div>
								<div className='text-2xl font-bold text-foreground'>
									1M+
								</div>

								<div className='text-xs font-medium text-muted-foreground uppercase tracking-wide mt-1'>
									Cards Reviewed
								</div>
							</div>

							<div>
								<div className='text-2xl font-bold text-foreground'>
									4.9/5
								</div>

								<div className='text-xs font-medium text-muted-foreground uppercase tracking-wide mt-1'>
									Rating
								</div>
							</div>
						</div>
					</div>

					{/* Hero Visual / Interactive Mock */}
					<div className='relative animate-in fade-in zoom-in-95 duration-1000 delay-200'>
						<div className='absolute inset-0 bg-linear-to-tr from-primary/30 to-fuchsia-400/30 rounded-[2.5rem] blur-2xl -z-10 transform rotate-3 scale-95' />

						{/* Main App Window Mock */}
						<Card className='relative overflow-hidden rounded-[2rem] border-border/60 bg-background/60 backdrop-blur-xl shadow-2xl'>
							<CardHeader className='border-b border-border/40 p-4 flex flex-row items-center justify-between'>
								<div className='flex gap-2'>
									<div className='w-3 h-3 rounded-full bg-red-400/80' />
									<div className='w-3 h-3 rounded-full bg-yellow-400/80' />
									<div className='w-3 h-3 rounded-full bg-green-400/80' />
								</div>

								<div className='text-xs font-medium text-muted-foreground'>
									Session: Advanced C++
								</div>

								<Badge
									variant='outline'
									className='text-[10px] h-5 border-primary/30 text-primary'>
									Live
								</Badge>
							</CardHeader>

							<CardContent className='p-6 md:p-8 space-y-8'>
								{/* Flashcard View */}
								<div className='text-center space-y-6'>
									<div className='inline-block px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground'>
										Definition
									</div>

									<div className='text-2xl md:text-3xl font-semibold leading-tight'>
										What does{' '}
										<span className='text-primary'>
											"alignment"
										</span>{' '}
										mean in C structs?
									</div>

									<div className='p-4 rounded-xl bg-muted/50 text-sm text-muted-foreground border border-border/50'>
										Hint: Think about CPU cycles and memory
										padding.
									</div>
								</div>

								{/* Action Buttons Mock */}
								<div className='grid grid-cols-2 gap-4 pt-4'>
									<div className='col-span-2 flex justify-center gap-8 text-xs text-muted-foreground mb-2'>
										<span className='flex items-center'>
											<Keyboard className='w-3 h-3 mr-1' />{' '}
											Space to flip
										</span>

										<span className='flex items-center'>
											<Keyboard className='w-3 h-3 mr-1' />{' '}
											1-4 to rate
										</span>
									</div>

									<Button
										variant='outline'
										className='h-12 border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-900/30 dark:hover:bg-red-900/20'>
										Again (1m)
									</Button>

									<Button className='h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20'>
										Good (1d)
									</Button>
								</div>
							</CardContent>
						</Card>

						{/* Floating Elements decoration */}
						<Card className='absolute -bottom-6 -left-6 w-48 p-4 rounded-2xl shadow-xl border-border/60 bg-background/80 backdrop-blur-md animate-bounce-slow hidden md:block'>
							<div className='flex items-center gap-3'>
								<div className='h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600'>
									<CheckCircle2 className='w-5 h-5' />
								</div>

								<div>
									<div className='text-sm font-bold'>
										12 Days
									</div>

									<div className='text-[10px] text-muted-foreground'>
										Current Streak
									</div>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</section>
	)
}
