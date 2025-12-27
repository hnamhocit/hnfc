import TextareaAutosize from 'react-textarea-autosize'

import MarkdownLive from '@/components/MarkdownLive'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'

interface DescriptionProps {
	value: string
	onChange: (value: string) => void
	error?: string
}

export default function Description({
	value,
	onChange,
	error,
}: DescriptionProps) {
	return (
		<Field>
			<FieldLabel className='text-xs text-muted-foreground'>
				Description (Markdown)
			</FieldLabel>

			<FieldError>{error}</FieldError>

			<TextareaAutosize
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className='resize-none outline-none'
				placeholder='Enter description...'
			/>

			<div className='pt-3'>
				<MarkdownLive value={value} />
			</div>
		</Field>
	)
}
