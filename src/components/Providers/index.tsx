'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useRef } from 'react'

import { auth, db, doc, onAuthStateChanged, onSnapshot } from '@/config'
import { IUser } from '@/interfaces'
import { useUserStore } from '@/stores'
import Loading from '../Loading'

const Providers = ({ children }: { children: ReactNode }) => {
	const { isLoading, user, setUser, setIsLoading } = useUserStore()
	const unsubscribeProfileRef = useRef<null | (() => void)>(null)
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
			unsubscribeProfileRef.current?.()
			unsubscribeProfileRef.current = null

			if (!user) {
				setUser(null)
				setIsLoading(false)
				return
			}

			const userRef = doc(db, 'users', user.uid)

			unsubscribeProfileRef.current = onSnapshot(
				userRef,
				(snapshot) => {
					if (snapshot.exists()) {
						setUser(snapshot.data() as IUser)
					}

					setIsLoading(false)
				},
				(error) => {
					console.error('[User snapshot]', error)
					setUser(null)
				},
			)
		})

		return () => {
			unsubscribeAuth()
			unsubscribeProfileRef.current?.()
		}
	}, [setIsLoading, setUser])

	useEffect(() => {
		if (user && (pathname === '/enter' || pathname === '/')) {
			router.replace('/dashboard')
		}
	}, [router, user, pathname])

	if (isLoading) {
		return (
			<div className='h-screen'>
				<Loading />
			</div>
		)
	}

	return children
}

export default Providers
