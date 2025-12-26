import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoginInput, loginSchema } from '@/schemas'
import { authService } from '@/services'
import PasswordInput from '../PasswordInput'

interface SignInFormProps {
	disabled: boolean
	setDisabled: Dispatch<SetStateAction<boolean>>
}

export default function SignInForm({ disabled, setDisabled }: SignInFormProps) {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onBlur',
		reValidateMode: 'onChange',
	})

	const onSubmit = async (data: LoginInput) => {
		setDisabled(true)

		try {
			await authService.login(data)
		} catch (error) {
			console.error('Login failed:', error)
		} finally {
			setDisabled(false)
		}
	}

	return (
		<form
			className='space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300'
			onSubmit={handleSubmit(onSubmit)}>
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
						placeholder='Enter your password'
						error={errors.password?.message}
						value={field.value}
						onChange={field.onChange}
					/>
				)}
			/>

			<div className='flex items-center justify-between'>
				<div className='flex items-center space-x-2'>
					<Checkbox
						id='remember'
						className='border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary'
					/>

					<Label
						htmlFor='remember'
						className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
						Remember me
					</Label>
				</div>

				<Link
					href='/forgot'
					className='text-sm font-medium text-primary hover:underline'>
					Forgot password?
				</Link>
			</div>

			<Button
				disabled={disabled}
				type='submit'
				size='lg'
				className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 mt-2'>
				Sign In
			</Button>
		</form>
	)
}
