import { BellIcon } from 'lucide-react'
import Image from 'next/image'

import { authService } from '@/services'
import { useUserStore } from '@/stores'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import BackButton from '../BackButton'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import ThemeButton from './ThemeButton'

export default function Header() {
	const { user } = useUserStore()
	const router = useRouter()
	const pathname = usePathname()

	return (
		<header className='sticky top-0 left-0 w-full z-20 h-16 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60'>
			<div className='flex items-center justify-between h-full container mx-auto px-4 md:px-6'>
				<div className='flex items-center gap-3'>
					{pathname !== '/dashboard' ? (
						<BackButton />
					) : (
						<Image
							src='/logo.png'
							alt='Logo'
							width={40}
							height={40}
							className='rounded-full'
						/>
					)}

					<Link
						href='/dashboard'
						className='text-2xl font-bold text-primary'>
						hnfc
					</Link>
				</div>

				<div className='flex items-center gap-4'>
					<ThemeButton />

					<Button
						size='icon'
						variant='outline'>
						<BellIcon />
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar>
								<AvatarFallback>
									{user?.displayName?.[0] || 'U'}
								</AvatarFallback>

								<AvatarImage
									src={user?.photoURL || undefined}
									alt={user?.displayName || 'User Avatar'}
								/>
							</Avatar>
						</DropdownMenuTrigger>

						<DropdownMenuContent>
							<DropdownMenuItem
								onClick={() => router.push('/me/profile')}>
								Profile
							</DropdownMenuItem>

							<DropdownMenuItem
								onClick={() => router.push('/me/settings')}>
								Settings
							</DropdownMenuItem>

							<DropdownMenuItem
								variant='destructive'
								onClick={authService.logout}>
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	)
}
