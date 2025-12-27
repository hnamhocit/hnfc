import { MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

export default function ThemeButton() {
	const [isDark, setIsDark] = useState(false)

	const toggleIsDark = () => setIsDark(!isDark)

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [isDark])

	return (
		<Button
			onClick={toggleIsDark}
			size='icon'
			variant='outline'>
			{isDark ? <MoonIcon /> : <SunIcon />}
		</Button>
	)
}
