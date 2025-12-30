import { HelpCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../../ui/accordion'

export default function FAQ() {
	const t = useTranslations('home.faqs')

	return (
		<section
			id='faq'
			className='container mx-auto py-24 px-4 bg-muted/20'>
			<div className='grid gap-12 md:grid-cols-2 lg:mx-auto'>
				<div>
					<h2 className='text-3xl font-bold tracking-tight mb-4'>
						{t('title')}
					</h2>

					<p className='text-lg text-muted-foreground mb-8'>
						{t.rich('subtitle', {
							supportLink: (chunks) => (
								<a
									key='supportLink'
									href='mailto:support@hnfc.app'
									className='underline underline-offset-4'>
									{chunks}
								</a>
							),
						})}
					</p>

					{/* Decorative Icon */}
					<div className='hidden md:flex justify-center items-center h-64 bg-primary/5 rounded-3xl border border-primary/10'>
						<HelpCircle className='w-32 h-32 text-primary/20' />
					</div>
				</div>

				<Accordion
					type='single'
					collapsible
					className='w-full'>
					{(
						t.raw('items') as { question: string; answer: string }[]
					).map((faq, index) => (
						<AccordionItem
							key={index}
							value={`item-${index}`}
							className='border-b border-muted-foreground/20'>
							<AccordionTrigger className='text-left text-base font-semibold hover:text-primary transition-colors'>
								{faq.question}
							</AccordionTrigger>

							<AccordionContent className='text-muted-foreground leading-relaxed'>
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	)
}
