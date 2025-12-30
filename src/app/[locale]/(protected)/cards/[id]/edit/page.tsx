'use client'

import { useParams } from 'next/navigation'

import CardForm from '@/components/CardForm'

export default function EditCardPage() {
	const { id } = useParams<{ id: string }>()

	return (
		<div className='p-4 md:p-8 container mx-auto'>
			<CardForm cardId={id} />
		</div>
	)
}
