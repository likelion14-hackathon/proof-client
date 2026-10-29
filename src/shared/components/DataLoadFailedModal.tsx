import type { ReactNode } from 'react'
import AlertSheet from '@/shared/components/AlertSheet'

interface DataLoadFailedModalProps {
  onConfirm: () => void
  /** 기본값: "측정 데이터를 불러올 수 없어요" */
  title?: string
  /** 기본값: 오프라인 측정 데이터 없음 안내 문구 */
  description?: ReactNode
}

export default function DataLoadFailedModal({
  onConfirm,
  title = '측정 데이터를 불러올 수 없어요',
  description = (
    <>
      오프라인에서 측정한 데이터를 찾을 수 없어요
      <br />
      오프라인 측정 진행 후 오프라인 측정 데이터를 불러와주세요
    </>
  ),
}: DataLoadFailedModalProps) {
  return (
    <AlertSheet
      title={title}
      description={description}
      primaryAction={{ label: '확인', onClick: onConfirm }}
    />
  )
}
