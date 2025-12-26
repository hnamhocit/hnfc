'use client'

import { useUserStore } from '@/stores'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

export default function ProtectedLayout({ children }: { children: ReactNode }) {
	const { user } = useUserStore()
	const router = useRouter()

	if (!user) {
		router.push('/enter')
		return null
	}

	return children
}
