import { MoreVerticalIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deckService } from '@/services'

export default function MoreMenu({ id }: { id: string }) {
	const router = useRouter()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					title='More'
					type='button'
					className='text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100'>
					<MoreVerticalIcon size={16} />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuItem
					onClick={() => router.push(`/decks/${id}/edit`)}>
					Edit
				</DropdownMenuItem>

				<DropdownMenuItem
					variant='destructive'
					onClick={() => deckService.remove(id)}>
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
