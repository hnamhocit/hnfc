import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ReactNode } from 'react'

import Providers from '@/components/Providers'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'hnfc',
	description:
		'hnfc is a cross-platform web flashcard app designed for consistent learning. Create decks in minutes, review with spaced repetition, and track progress across devices with real-time sync. Whether you’re learning languages, preparing for exams, or building professional knowledge, hnfc keeps your study workflow simple, fast, and focused.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
