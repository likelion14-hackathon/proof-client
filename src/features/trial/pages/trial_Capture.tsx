import { analyzeDiaryImage } from '@/features/analyze/api'
import FaceCaptureScreen from '@/features/analyze/components/FaceCaptureScreen'

export default function Trial_Capture() {
  return (
    <FaceCaptureScreen
      eyebrow="체험해보기"
      upload={analyzeDiaryImage}
      nextPath="/trial/capture/complete"
    />
  )
}
