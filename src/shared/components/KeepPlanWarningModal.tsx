import AlertSheet from '@/shared/components/AlertSheet'

interface KeepPlanWarningModalProps {
  onConfirm: () => void
  onCancel: () => void
}

export default function KeepPlanWarningModal({
  onConfirm,
  onCancel,
}: KeepPlanWarningModalProps) {
  return (
    <AlertSheet
      title="기존 플랜을 유지하시겠어요?"
      description={
        <>
          기존 플랜을 유지할 경우 개선된 플랜 참여가 어렵습니다.
          <br />
          계속 진행하시겠어요?
        </>
      }
      secondaryAction={{ label: '취소', onClick: onCancel }}
      primaryAction={{ label: '확인', onClick: onConfirm }}
      onDismiss={onCancel}
    />
  )
}
