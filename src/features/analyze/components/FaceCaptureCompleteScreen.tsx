import { useLocation } from 'react-router-dom'
import FaceCaptureLayout from '@/features/analyze/components/FaceCaptureLayout'
import checkIcon from '@/shared/assets/icons/check.svg'
import { useTimedNavigate } from '@/shared/hooks/useTimedNavigate'

/** 완료 표시를 보여주는 시간(ms) */
const COMPLETE_VISIBLE_MS = 1500

interface CaptureCompleteState {
  requestId?: string
}

interface FaceCaptureCompleteScreenProps {
  eyebrow: string
  /** 잠시 후 이동할 분석 진행 화면 경로. requestId를 그대로 넘긴다 */
  nextPath: string
}

/** 촬영 직후 "좋아요!"를 잠깐 보여주고 분석 진행 화면으로 넘어가는 화면 */
export default function FaceCaptureCompleteScreen({
  eyebrow,
  nextPath,
}: FaceCaptureCompleteScreenProps) {
  const location = useLocation()
  const requestId = (location.state as CaptureCompleteState | null)?.requestId

  useTimedNavigate(nextPath, COMPLETE_VISIBLE_MS, { state: { requestId } })

  return (
    <FaceCaptureLayout eyebrow={eyebrow}>
      <div className="animate-fade-in absolute inset-0 flex flex-col items-center justify-center">
        <img src={checkIcon} alt="완료" className="h-15 w-21.5" />
        <p className="text-primary mt-7.5 text-xl font-semibold whitespace-nowrap">
          좋아요!
        </p>
      </div>
    </FaceCaptureLayout>
  )
}
