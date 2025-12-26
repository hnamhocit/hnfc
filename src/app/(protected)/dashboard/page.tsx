'use client'

import { Button } from '@/components/ui/button'
import { authService } from '@/services'
import { useUserStore } from '@/stores'

export default function DashboardPage() {
	const { user } = useUserStore()

	return (
		<div className='p-4 space-y-4'>
			<div>Hi, {user?.displayName}!</div>
			<Button onClick={authService.logout}>Logout</Button>
		</div>
	)
}
