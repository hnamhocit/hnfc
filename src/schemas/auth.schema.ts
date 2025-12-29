import { z } from 'zod'

const password = z
	.string()
	.nonempty('Password is required')
	.regex(
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
		'Min 8 chars, incl. upper, lower, number & special.',
	)

export const loginSchema = z.object({
	email: z.email('Invalid email'),
	password,
})

export type LoginInput = z.infer<typeof loginSchema>

export const registerSchema = z.object({
	displayName: z
		.string()
		.min(2, 'Name is too short')
		.max(35, 'Name is too long'),
	email: z.email('Invalid email'),
	password,
})

export type RegisterInput = z.infer<typeof registerSchema>
