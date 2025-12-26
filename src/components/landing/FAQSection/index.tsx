import { HelpCircle } from 'lucide-react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../../ui/accordion'

const FAQS = [
	{
		question: 'Why is there a paid plan?',
		answer: 'hnfc uses premium cloud infrastructure (Firebase) to ensure your data is synced instantly and securely across all devices. The paid plans help cover these server and storage costs so we can keep the app fast and reliable without selling your data.',
	},
	{
		question: 'Is the Free plan really free forever?',
		answer: 'Yes! If you only need text-based flashcards and don’t need to upload heavy images, the Free plan is generous enough for most students. We will never delete your data just because you are on the Free tier.',
	},
	{
		question: 'Can I use it offline?',
		answer: 'Offline mode is available on the Plus and Pro plans. It allows you to review your decks even without an internet connection, and changes will sync automatically once you are back online.',
	},
	{
		question: 'What happens to my data if I cancel?',
		answer: 'Your data is yours. If you cancel a paid subscription, your account will revert to the Free tier limits. You won’t lose your text cards, but you may need to free up storage space if you are over the limit.',
	},
	{
		question: 'Do you offer student discounts?',
		answer: 'Yes! We offer 50% off the Plus plan for students with a valid .edu email address. Contact support after signing up to apply.',
	},
]

export default function FAQSection() {
	return (
		<section
			id='faq'
			className='container mx-auto py-24 px-4 bg-muted/20'>
			<div className='grid gap-12 md:grid-cols-2 lg:mx-auto'>
				<div>
					<h2 className='text-3xl font-bold tracking-tight mb-4'>
						Frequently asked questions
					</h2>
					<p className='text-lg text-muted-foreground mb-8'>
						Can’t find the answer you’re looking for? Reach out to
						our{' '}
						<a
							href='mailto:support@hnfc.app'
							className='text-primary hover:underline'>
							customer support
						</a>{' '}
						team.
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
					{FAQS.map((faq, index) => (
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
