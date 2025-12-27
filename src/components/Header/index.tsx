import { BellIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { authService } from '@/services'
import { useUserStore } from '@/stores'
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

	return (
		<header className='sticky top-0 left-0 w-full bg-white dark:bg-neutral-900 transition-colors z-20 h-16 shadow'>
			<div className='flex items-center justify-between h-full container mx-auto px-4 md:px-6'>
				<div className='flex items-center gap-3'>
					<Link href='/dashboard'>
						<Image
							src='/logo.png'
							alt='Logo'
							width={40}
							height={40}
							className='rounded-full'
						/>
					</Link>

					<h1 className='text-2xl font-bold text-primary'>hnfc</h1>
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
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Settings</DropdownMenuItem>
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
