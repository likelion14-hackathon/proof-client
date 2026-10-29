import { requestDiaryAnalysis } from '@/features/analyze/api'
import FaceCaptureScreen from '@/features/analyze/components/FaceCaptureScreen'

export default function DiaryPhotoCapture() {
  return (
    <FaceCaptureScreen
      eyebrow="오늘의 기록"
      upload={requestDiaryAnalysis}
      nextPath="/diary/photo-capture/complete"
    />
  )
}
