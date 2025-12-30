'use client'

import Link from 'next/link'

import LegalFooter from '@/components/legal/Footer'
import LegalHeader from '@/components/legal/Header'
import { Button } from '@/components/ui/button'

export default function TermsPage() {
	return (
		<main className='min-h-[calc(100vh-4rem)]'>
			<div className='container mx-auto p-4 md:p-8'>
				<LegalHeader />

				{/* Title */}
				<div className='mb-6'>
					<h1 className='text-3xl font-bold text-foreground'>
						Terms of Service
					</h1>
					<p className='mt-2 text-muted-foreground'>
						Please read these terms carefully before using hnfc.
					</p>
				</div>

				{/* Content */}
				<div className='rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-8 space-y-10'>
					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							1. Acceptance of Terms
						</h2>
						<p className='text-muted-foreground'>
							By accessing or using <strong>hnfc</strong>, you
							agree to be bound by these Terms of Service. If you
							do not agree to these terms, please do not use the
							application.
						</p>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							2. Description of the Service
						</h2>
						<p className='text-muted-foreground'>
							hnfc is a learning application that allows users to
							create, manage, and study decks, notes, and cards.
							The service is currently in an experimental phase,
							and features may change over time.
						</p>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							3. User Accounts
						</h2>
						<p className='text-muted-foreground'>
							You are responsible for maintaining the
							confidentiality of your account and for all
							activities that occur under your account. You agree
							to provide accurate and complete information when
							creating an account.
						</p>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							4. User Content
						</h2>
						<p className='text-muted-foreground'>
							You retain ownership of the content you create
							within hnfc, including decks, notes, and cards. By
							using the service, you grant hnfc permission to
							store and process this content solely for the
							purpose of providing the service.
						</p>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							5. Acceptable Use
						</h2>
						<p className='text-muted-foreground'>
							You agree not to misuse the service, including but
							not limited to:
						</p>
						<ul className='list-disc pl-6 text-muted-foreground'>
							<li>
								Attempting to gain unauthorized access to the
								system
							</li>
							<li>Uploading malicious or harmful content</li>
							<li>Disrupting or interfering with the service</li>
						</ul>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							6. Termination
						</h2>
						<p className='text-muted-foreground'>
							We reserve the right to suspend or terminate your
							access to the service at any time if you violate
							these Terms. You may also request deletion of your
							account at any time.
						</p>

						<div className='flex flex-col sm:flex-row gap-3 pt-2'>
							<Button asChild>
								<Link href='/delete-account'>
									Request Account Deletion
								</Link>
							</Button>
							<Button
								variant='secondary'
								asChild>
								<Link href='/privacy'>View Privacy Policy</Link>
							</Button>
						</div>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							7. Disclaimer
						</h2>
						<p className='text-muted-foreground'>
							The service is provided on an &quot;as is&quot; and
							&quot;as available&quot; basis. hnfc makes no
							warranties regarding the reliability, availability,
							or accuracy of the service.
						</p>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							8. Limitation of Liability
						</h2>
						<p className='text-muted-foreground'>
							To the maximum extent permitted by law, hnfc shall
							not be liable for any indirect, incidental, or
							consequential damages arising from your use of the
							service.
						</p>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							9. Changes to These Terms
						</h2>
						<p className='text-muted-foreground'>
							We may update these Terms from time to time.
							Continued use of the service after changes become
							effective constitutes acceptance of the updated
							Terms.
						</p>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							10. Contact
						</h2>
						<p className='text-muted-foreground'>
							If you have any questions about these Terms, please
							contact:
						</p>

						<div className='rounded-xl border border-border bg-background/40 p-4'>
							<div className='text-sm text-muted-foreground'>
								Email
							</div>
							<div className='font-medium text-foreground'>
								hnamhocit@gmail.com
							</div>
						</div>
					</section>

					<div className='pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
						<div className='text-xs text-muted-foreground'>
							Last updated: {new Date().toLocaleDateString()}
						</div>
						<div className='flex gap-3 text-sm'>
							<Link
								className='text-primary hover:underline'
								href='/privacy'>
								Privacy
							</Link>
							<Link
								className='text-primary hover:underline'
								href='/delete-account'>
								Data Deletion
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
