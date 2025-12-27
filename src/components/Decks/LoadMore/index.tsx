import { Button } from '@/components/ui/button'

interface LoadMoreProps {
	isLoadingMore: boolean
	loadMore: () => Promise<void>
}

export default function LoadMore({ isLoadingMore, loadMore }: LoadMoreProps) {
	return (
		<div className='mt-8 flex flex-col items-center gap-3'>
			<Button
				onClick={loadMore}
				disabled={isLoadingMore}
				variant='secondary'>
				{isLoadingMore ? 'Đang tải thêm...' : 'Tải thêm'}
			</Button>

			{isLoadingMore && (
				<div className='text-sm text-slate-500'>
					Loading more decks...
				</div>
			)}
		</div>
	)
}
