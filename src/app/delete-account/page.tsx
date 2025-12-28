'use client'

import Link from 'next/link'

import LegalFooter from '@/components/legal/Footer'
import LegalHeader from '@/components/legal/Header'
import { Button } from '@/components/ui/button'

export default function DeleteAccountPage() {
	return (
		<main className='min-h-[calc(100vh-4rem)]'>
			<div className='container mx-auto p-4 md:p-8'>
				<LegalHeader />

				{/* Title */}
				<div className='mb-6'>
					<h1 className='text-3xl font-bold text-foreground'>
						User Data Deletion
					</h1>
					<p className='mt-2 text-muted-foreground'>
						Request permanent deletion of your account and
						associated data.
					</p>
				</div>

				{/* Content Card */}
				<div className='rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-8 space-y-10'>
					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							Deletion Request Options
						</h2>
						<p className='text-muted-foreground'>
							You can request account and data deletion using one
							of the options below.
						</p>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='rounded-xl border border-border bg-background/40 p-5 space-y-2'>
								<div className='font-semibold text-foreground'>
									Option 1: Email
								</div>
								<p className='text-sm text-muted-foreground'>
									Send an email with your sign-in email
									address.
								</p>
								<div className='text-sm'>
									<div className='text-muted-foreground'>
										To
									</div>
									<div className='font-medium text-foreground'>
										hnamhocit@gmail.com
									</div>
								</div>
								<div className='text-sm'>
									<div className='text-muted-foreground'>
										Subject
									</div>
									<div className='font-medium text-foreground'>
										User Data Deletion Request
									</div>
								</div>

								<Button
									asChild
									className='w-full mt-2'>
									<a href='mailto:hnamhocit@gmail.com?subject=User%20Data%20Deletion%20Request'>
										Send Email Request
									</a>
								</Button>
							</div>

							<div className='rounded-xl border border-border bg-background/40 p-5 space-y-2'>
								<div className='font-semibold text-foreground'>
									Option 2: In-app
								</div>
								<p className='text-sm text-muted-foreground'>
									If available, you can also request deletion
									from your Settings page.
								</p>

								<Button
									asChild
									variant='secondary'
									className='w-full mt-2'>
									<Link href='/me/settings'>
										Go to Settings
									</Link>
								</Button>

								<p className='text-xs text-muted-foreground'>
									Note: If you cannot access the app, please
									use Option 1 (Email).
								</p>
							</div>
						</div>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							Data That Will Be Deleted
						</h2>
						<ul className='list-disc pl-6 text-muted-foreground'>
							<li>Your user profile and account metadata</li>
							<li>Decks, cards/notes, and study progress</li>
							<li>
								Any related content stored in the application
							</li>
						</ul>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							Verification & Processing Time
						</h2>
						<p className='text-muted-foreground'>
							For security, we may ask you to verify ownership of
							the account. Requests are processed within{' '}
							<strong>7 business days</strong>.
						</p>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							Related Links
						</h2>
						<div className='flex flex-col sm:flex-row gap-3'>
							<Button
								variant='secondary'
								asChild>
								<Link href='/privacy'>View Privacy Policy</Link>
							</Button>
							<Button asChild>
								<Link href='/dashboard'>Back to Home</Link>
							</Button>
						</div>
					</section>

					<div className='pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
						<div className='text-xs text-muted-foreground'>
							This page is provided to comply with Facebook (Meta)
							data protection requirements.
						</div>
						<div className='flex gap-3 text-sm'>
							<Link
								className='text-primary hover:underline'
								href='/privacy'>
								Privacy
							</Link>
							<Link
								className='text-primary hover:underline'
								href='/dashboard'>
								Home
							</Link>
						</div>
					</div>
				</div>

				<LegalFooter />
			</div>
		</main>
	)
}
