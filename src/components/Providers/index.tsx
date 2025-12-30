'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useRef } from 'react'

import { auth, db, doc, onAuthStateChanged, onSnapshot } from '@/config'
import { ILocale, IUser } from '@/interfaces'
import { useLocaleStore, useUserStore } from '@/stores'
import Loading from '../Loading'

interface ProvidersProps {
	children: ReactNode
	locale: ILocale
}

const Providers = ({ children, locale }: ProvidersProps) => {
	const { isLoading, user, setUser, setIsLoading } = useUserStore()
	const { setLocale } = useLocaleStore()
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
		if (
			user &&
			(pathname === '/en/enter' ||
				pathname === '/en' ||
				pathname === '/vi/enter' ||
				pathname === '/vi')
		) {
			router.replace('/dashboard')
		}
	}, [router, user, pathname])

	useEffect(() => {
		setLocale(locale)
	}, [locale])

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
