import { Alert, AlertDescription, AlertTitle } from '../ui/alert'

export default function WarningAlert() {
	return (
		<Alert className='mb-6 border-border bg-card text-card-foreground'>
			<AlertTitle>Thông báo thử nghiệm</AlertTitle>
			<AlertDescription className='text-muted-foreground'>
				Ứng dụng đang trong giai đoạn thử nghiệm và có thể phát sinh
				lỗi. Hiện đã có: đăng nhập/đăng ký bằng Email &amp; Password
				hoặc GitHub/Facebook/Google; xem/thêm/sửa/xóa deck;
				Profile/Settings; Logout. Mọi phản hồi của bạn sẽ giúp mình hoàn
				thiện sản phẩm.
			</AlertDescription>
		</Alert>
	)
}
