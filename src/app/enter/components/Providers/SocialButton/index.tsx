import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface SocialButtonProps {
	icon: string
	label: string
	disabled: boolean
	onClick: () => void
}

export default function SocialButton({
	icon,
	label,
	disabled,
	onClick,
}: SocialButtonProps) {
	return (
		<Button
			variant='outline'
			disabled={disabled}
			onClick={onClick}
			className='h-11 border-border hover:bg-muted hover:text-foreground'>
			<Image
				src={icon}
				alt={label}
				width={20}
				height={20}
				className='mr-0 lg:mr-2'
			/>
			<span className='hidden lg:inline'>{label}</span>
		</Button>
	)
}
