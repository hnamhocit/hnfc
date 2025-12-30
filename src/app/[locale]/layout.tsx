import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

import Providers from '@/components/Providers'
import { routing } from '@/i18n/routing'
import { ILocale } from '@/interfaces'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin-ext'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin-ext'],
})

export const metadata: Metadata = {
	title: 'hnfc',
	description:
		'hnfc is a cross-platform web flashcard app designed for consistent learning. Create decks in minutes, review with spaced repetition, and track progress across devices with real-time sync. Whether you’re learning languages, preparing for exams, or building professional knowledge, hnfc keeps your study workflow simple, fast, and focused.',
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: ReactNode
	params: Promise<{ locale: string }>
}>) {
	const { locale } = await params

	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	const typedLocale = locale as ILocale

	return (
		<html>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<NextIntlClientProvider>
					<Providers locale={typedLocale}>{children}</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
