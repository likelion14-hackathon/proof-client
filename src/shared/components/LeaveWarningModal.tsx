import AlertSheet from '@/shared/components/AlertSheet'

interface LeaveWarningModalProps {
  onApprove: () => void
  onReject: () => void
}

export default function LeaveWarningModal({
  onApprove,
  onReject,
}: LeaveWarningModalProps) {
  return (
    <AlertSheet
      title="정보를 잃어버릴 수 있어요"
      description="이 단계에서 뒤로 돌아가면 조회했던 정보를 잃어버릴 수 있으며, 이후 다시 불러와야할 수도 있어요. 계속 진행하시겠어요?"
      secondaryAction={{ label: '거절', onClick: onReject }}
      primaryAction={{ label: '승인', onClick: onApprove }}
      onDismiss={onReject}
    />
  )
}
