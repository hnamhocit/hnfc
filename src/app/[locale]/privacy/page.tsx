'use client'

import Link from 'next/link'

import LegalFooter from '@/components/legal/Footer'
import LegalHeader from '@/components/legal/Header'
import { Button } from '@/components/ui/button'

export default function PrivacyPage() {
	return (
		<main className='min-h-[calc(100vh-4rem)]'>
			<div className='container mx-auto p-4 md:p-8'>
				<LegalHeader />

				{/* Title */}
				<div className='mb-6'>
					<h1 className='text-3xl font-bold text-foreground'>
						Privacy Policy
					</h1>
					<p className='mt-2 text-muted-foreground'>
						This Privacy Policy explains how hnfc collects, uses,
						and protects your information when you use our
						application.
					</p>
				</div>

				{/* Content Card */}
				<div className='rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-8 space-y-10'>
					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							Overview
						</h2>
						<p className='text-muted-foreground'>
							hnfc is a learning application that helps users
							create and study decks and cards. We only collect
							the minimum necessary data to provide authentication
							and core features.
						</p>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							Information We Collect
						</h2>
						<p className='text-muted-foreground'>
							Depending on your sign-in method (Email & Password
							or third-party providers such as Google, Facebook,
							GitHub), we may collect:
						</p>
						<ul className='list-disc pl-6 text-muted-foreground'>
							<li>Display name</li>
							<li>Email address</li>
							<li>Profile photo URL (if available)</li>
							<li>Basic account identifiers (user ID)</li>
						</ul>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							Learning Data You Create
						</h2>
						<p className='text-muted-foreground'>
							When you use hnfc, you may create learning content.
							This data may include:
						</p>
						<ul className='list-disc pl-6 text-muted-foreground'>
							<li>Decks (title, description, color, tags)</li>
							<li>Cards/notes and study progress</li>
							<li>
								Scheduling metadata used for learning/review
							</li>
						</ul>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							How We Use Your Information
						</h2>
						<ul className='list-disc pl-6 text-muted-foreground'>
							<li>Authenticate and manage your account</li>
							<li>
								Provide core features (create/edit study
								content)
							</li>
							<li>Save your study progress and preferences</li>
							<li>Maintain security and prevent abuse</li>
						</ul>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							Data Sharing
						</h2>
						<p className='text-muted-foreground'>
							We do <strong>not</strong> sell your personal
							information. We do not share personal data with
							third parties except:
						</p>
						<ul className='list-disc pl-6 text-muted-foreground'>
							<li>When required by law or legal process</li>
							<li>
								With service providers strictly necessary to
								operate the app (e.g., Firebase for
								authentication and data storage)
							</li>
						</ul>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							Data Storage & Security
						</h2>
						<p className='text-muted-foreground'>
							We store data using Firebase services. We apply
							access control so that only the authenticated owner
							can access their own content. While no system is
							100% secure, we take reasonable steps to protect
							your data.
						</p>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							Your Rights & Choices
						</h2>
						<p className='text-muted-foreground'>
							You can update your profile information from the
							Settings page. You may also request deletion of your
							account and data at any time.
						</p>

						<div className='flex flex-col sm:flex-row gap-3 pt-2'>
							<Button asChild>
								<Link href='/delete-account'>
									Request Data Deletion
								</Link>
							</Button>
							<Button
								variant='secondary'
								asChild>
								<Link href='/me/settings'>Go to Settings</Link>
							</Button>
						</div>
					</section>

					<section className='space-y-3'>
						<h2 className='text-xl font-semibold text-primary'>
							Contact
						</h2>
						<p className='text-muted-foreground'>
							If you have any questions about this Privacy Policy,
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
								href='/dashboard'>
								Home
							</Link>
							<Link
								className='text-primary hover:underline'
								href='/delete-account'>
								Data Deletion
							</Link>
						</div>
					</div>
				</div>

				<LegalFooter />
			</div>
		</main>
	)
}
