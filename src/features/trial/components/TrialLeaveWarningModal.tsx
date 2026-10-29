import AlertSheet from '@/shared/components/AlertSheet'

interface TrialLeaveWarningModalProps {
  onApprove: () => void
  onReject: () => void
}

export default function TrialLeaveWarningModal({
  onApprove,
  onReject,
}: TrialLeaveWarningModalProps) {
  return (
    <AlertSheet
      title="뒤로 돌아가기"
      description="이 단계에서 뒤로 돌아가면 피부 분석을 위해 사진 촬영을 다시 진행해야 해요. 계속 진행하시겠어요?"
      secondaryAction={{ label: '거절', onClick: onReject }}
      primaryAction={{ label: '승인', onClick: onApprove }}
      onDismiss={onReject}
    />
  )
}
