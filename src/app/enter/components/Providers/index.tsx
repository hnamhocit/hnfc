import { Dispatch, SetStateAction } from 'react'

import { Separator } from '@/components/ui/separator'
import {
	auth,
	facebookProvider,
	githubProvider,
	googleProvider,
	signInWithPopup,
} from '@/config'
import { upsertUser } from '@/utils/upsertUser'
import SocialButton from './SocialButton'

interface ProvidersProps {
	disabled: boolean
	setDisabled: Dispatch<SetStateAction<boolean>>
}

export default function Providers({ disabled, setDisabled }: ProvidersProps) {
	const signInWithProvider = async (
		provider: 'github' | 'google' | 'facebook',
	) => {
		setDisabled(true)

		try {
			let _provider: any = null

			if (provider === 'github') {
				_provider = githubProvider
			} else if (provider === 'google') {
				_provider = googleProvider
			} else {
				_provider = facebookProvider
			}

			const { user } = await signInWithPopup(auth, _provider)
			await upsertUser(user)
		} catch (error) {
			console.error('Error during sign-in with provider:', error)
		} finally {
			setDisabled(false)
		}
	}

	return (
		<>
			<div className='grid grid-cols-3 gap-4 mb-6'>
				<SocialButton
					icon='/providers/github.png'
					label='Github'
					disabled={disabled}
					onClick={() => signInWithProvider('github')}
				/>

				<SocialButton
					icon='/providers/facebook.png'
					label='Facebook'
					disabled={disabled}
					onClick={() => signInWithProvider('facebook')}
				/>

				<SocialButton
					icon='/providers/google.webp'
					label='Google'
					disabled={disabled}
					onClick={() => signInWithProvider('google')}
				/>
			</div>

			<div className='flex items-center gap-4 mb-6'>
				<Separator className='flex-1' />

				<span className='text-xs font-medium text-muted-foreground uppercase'>
					Or Email
				</span>

				<Separator className='flex-1' />
			</div>
		</>
	)
}
