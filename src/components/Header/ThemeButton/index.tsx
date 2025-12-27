'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'theme'

export default function ThemeButton() {
	const [isDark, setIsDark] = useState<boolean | null>(null)

	useEffect(() => {
		if (typeof window === 'undefined') return

		const stored = localStorage.getItem(STORAGE_KEY)
		const prefersDark =
			window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false

		const dark = stored ? stored === 'dark' : prefersDark

		setIsDark(dark)
	}, [])

	useEffect(() => {
		if (isDark === null) return

		const root = document.documentElement

		if (isDark) {
			root.classList.add('dark')
			localStorage.setItem(STORAGE_KEY, 'dark')
		} else {
			root.classList.remove('dark')
			localStorage.setItem(STORAGE_KEY, 'light')
		}
	}, [isDark])

	if (isDark === null) return null

	return (
		<Button
			onClick={() => setIsDark((v) => !v)}
			size='icon'
			variant='outline'
			aria-label='Toggle theme'>
			{isDark ? <MoonIcon /> : <SunIcon />}
		</Button>
	)
}
