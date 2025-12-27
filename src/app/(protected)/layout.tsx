'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

import { useUserStore } from '@/stores'

export default function ProtectedLayout({ children }: { children: ReactNode }) {
	const { user, isLoading } = useUserStore()
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		if (!isLoading && !user) {
			router.replace(`/enter`)
		}
	}, [isLoading, user, router, pathname])

	if (isLoading) return null

	if (!user) return null

	return children
}
