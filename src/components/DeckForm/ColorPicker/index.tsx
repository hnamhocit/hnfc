import { PaletteIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const COLOR_PRESETS = [
	{ key: 'slate', name: 'Slate', value: '#64748b' },
	{ key: 'blue', name: 'Blue', value: '#3b82f6' },
	{ key: 'emerald', name: 'Emerald', value: '#10b981' },
	{ key: 'amber', name: 'Amber', value: '#f59e0b' },
	{ key: 'rose', name: 'Rose', value: '#f43f5e' },
	{ key: 'violet', name: 'Violet', value: '#8b5cf6' },
]

interface ColorPickerProps {
	value: string
	onChange: (value: string) => void
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
	return (
		<Field>
			<FieldLabel>Color</FieldLabel>

			<div className='flex flex-wrap items-center gap-2'>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant='outline'
							className='rounded-xl'>
							<PaletteIcon className='mr-2 h-4 w-4' />
							Choose
							<span
								className='ml-2 inline-block h-3 w-3 rounded-full'
								style={{ background: value }}
							/>
						</Button>
					</PopoverTrigger>

					<PopoverContent className='w-72 rounded-2xl'>
						<div className='space-y-3'>
							<div className='text-sm font-medium'>Presets</div>

							<div className='grid grid-cols-3 gap-2'>
								{COLOR_PRESETS.map((c) => (
									<button
										key={c.key}
										type='button'
										className={cn(
											'flex items-center gap-2 rounded-xl border p-2 text-left text-sm transition hover:bg-accent',
											value === c.value &&
												'ring-2 ring-ring',
										)}
										onClick={() => onChange(c.value)}>
										<span
											className='h-3 w-3 rounded-full'
											style={{
												background: c.value,
											}}
										/>

										<span className='truncate'>
											{c.name}
										</span>
									</button>
								))}
							</div>

							<Separator />

							<div className='space-y-2'>
								<div className='text-sm font-medium'>
									Custom
								</div>

								<div className='flex items-center gap-3'>
									<Input
										value={value}
										onChange={(e) => {
											if (!e.target.value.startsWith('#'))
												return
											onChange(e.target.value)
										}}
										placeholder='#3b82f6'
										className='rounded-xl'
									/>

									<input
										aria-label='Pick color'
										type='color'
										value={value}
										onChange={(e) => {
											if (!e.target.value.startsWith('#'))
												return
											onChange(e.target.value)
										}}
										className='h-10 w-10 rounded-xl border bg-transparent p-1'
									/>
								</div>
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</Field>
	)
}
