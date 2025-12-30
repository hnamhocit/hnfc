import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { RegisterInput, registerSchema } from '@/schemas'
import { authService } from '@/services'
import PasswordInput from '../PasswordInput'

interface SignUpFormProps {
	disabled: boolean
	setDisabled: Dispatch<SetStateAction<boolean>>
}

export default function SignUpForm({ disabled, setDisabled }: SignUpFormProps) {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			displayName: '',
			email: '',
			password: '',
		},
		mode: 'onBlur',
		reValidateMode: 'onChange',
	})

	const onSubmit = async (data: RegisterInput) => {
		setDisabled(true)

		try {
			await authService.register(data)
		} catch (error) {
			console.error('Register failed:', error)
		} finally {
			setDisabled(false)
		}
	}

	return (
		<form
			className='space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300'
			onSubmit={handleSubmit(onSubmit)}>
			<Field>
				<FieldLabel>Display Name</FieldLabel>

				<Input
					id='displayName'
					type='text'
					placeholder='John Doe'
					className='h-12 border-input focus-visible:ring-primary'
					{...register('displayName')}
				/>

				<FieldError>{errors.displayName?.message}</FieldError>
			</Field>

			<Field>
				<FieldLabel>Email Address</FieldLabel>

				<Input
					id='email'
					type='email'
					placeholder='you@example.com'
					className='h-12 border-input focus-visible:ring-primary'
					{...register('email')}
				/>

				<FieldError>{errors.email?.message}</FieldError>
			</Field>

			<Controller
				control={control}
				name='password'
				render={({ field }) => (
					<PasswordInput
						label='Password'
						placeholder='Create a password (min 8 chars)'
						error={errors.password?.message}
						value={field.value}
						onChange={field.onChange}
					/>
				)}
			/>

			<Button
				disabled={disabled}
				type='submit'
				size='lg'
				className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 mt-2'>
				Create Account
			</Button>
		</form>
	)
}
