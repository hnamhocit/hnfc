import z from 'zod'

export const deckSchema = z.object({
	title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
	description: z.string().max(500, 'Description is too long'),
	tags: z.array(z.string().max(10, 'Tag is too long')),
	color: z
		.string()
		.regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, 'Invalid color'),
})

export type DeckInput = z.infer<typeof deckSchema>
