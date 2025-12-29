'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { createId } from '@paralleldrive/cuid2'
import { Timestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import type { ICard } from '@/interfaces'
import { cardSchema, type CardValues } from '@/schemas'
import { cardService } from '@/services'
import { useUserStore } from '@/stores'
import { createInitialFsrsState, getIdOrThrow } from '@/utils'

import DeckPicker from './DeckPicker'

type Props = {
	cardId?: string
}

export default function CardForm({ cardId }: Props) {
	const uid = useUserStore((s) => s.user?.id)
	const isEdit = !!cardId

	const [saving, setSaving] = useState(false)
	const [topError, setTopError] = useState('')

	const form = useForm<CardValues>({
		resolver: zodResolver(cardSchema),
		defaultValues: {
			deckId: '',
			front: '',
			back: '',
		},
	})

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = form

	// load card for edit
	useEffect(() => {
		if (!isEdit || !cardId) return

		cardService.getById(cardId).then((card) => {
			reset({
				deckId: card.deckId,
				front: card.front,
				back: card.back,
			})
		})
	}, [isEdit, cardId, reset])

	const submit = async (values: CardValues) => {
		setSaving(true)
		setTopError('')

		try {
			const ownerId = uid ?? getIdOrThrow()
			const now = Timestamp.now()

			if (isEdit && cardId) {
				await cardService.update(cardId, {
					deckId: values.deckId,
					front: values.front.trim(),
					back: values.back.trim(),
					updatedAt: now,
				} as any)

				return
			}

			const payload: ICard = {
				id: createId(),
				ownerId,
				deckId: values.deckId,
				front: values.front.trim(),
				back: values.back.trim(),
				srs: createInitialFsrsState(),
				createdAt: now,
				updatedAt: now,
			}

			await cardService.create(payload)

			reset({ deckId: values.deckId, front: '', back: '' })
		} catch (e: any) {
			setTopError(e?.message ?? 'Failed to save card')
		} finally {
			setSaving(false)
		}
	}

	return (
		<form
			onSubmit={handleSubmit(submit)}
			className='rounded-2xl border border-border bg-card p-6 space-y-6'>
			<div className='space-y-1'>
				<h1 className='text-2xl font-bold text-foreground'>
					{isEdit ? 'Edit card' : 'Create card'}
				</h1>

				<p className='text-sm text-muted-foreground'>
					{isEdit
						? 'Update the deck or content of this card.'
						: 'Add a new card to a deck.'}
				</p>
			</div>

			{topError && (
				<div className='text-sm text-destructive'>{topError}</div>
			)}

			<Field>
				<FieldLabel>Deck</FieldLabel>
				<Controller
					control={control}
					name='deckId'
					render={({ field }) => (
						<DeckPicker
							value={field.value || null}
							onChange={field.onChange}
						/>
					)}
				/>
				{errors.deckId && (
					<FieldError>{errors.deckId.message}</FieldError>
				)}
			</Field>

			<Field>
				<FieldLabel>Front</FieldLabel>
				<Input {...register('front')} />
				{errors.front && (
					<FieldError>{errors.front.message}</FieldError>
				)}
			</Field>

			<Field>
				<FieldLabel>Back</FieldLabel>
				<Textarea
					className='min-h-28'
					{...register('back')}
				/>
				{errors.back && <FieldError>{errors.back.message}</FieldError>}
			</Field>

			<div className='flex justify-end gap-3'>
				<Button
					type='submit'
					disabled={!isValid || saving}>
					{saving ? 'Saving...' : isEdit ? 'Save changes' : 'Create'}
				</Button>
			</div>
		</form>
	)
}
