import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FaceCaptureLayout from '@/features/analyze/components/FaceCaptureLayout'
import type { AnalyzeDiaryResult } from '@/features/analyze/types'
import personSilhouette from '@/shared/assets/icons/person.svg'
import BottomButton from '@/shared/components/BottomButton'
import { ApiError } from '@/shared/api/apiError'
import { useScrollLock } from '@/shared/hooks/useScrollLock'

const ANALYZE_ERROR_MESSAGE: Partial<Record<string, string>> = {
  C5003: '이미지를 업로드하지 못했어요. 다시 촬영해주세요.',
  C502: '지금은 분석 서버 연결이 원활하지 않아요. 잠시 후 다시 시도해주세요.',
}

function captureVideoFrame(video: HTMLVideoElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      reject(new Error('이미지를 만들 수 없어요.'))
      return
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error('이미지를 만들 수 없어요.')),
      'image/jpeg',
      0.92,
    )
  })
}

interface FaceCaptureScreenProps {
  eyebrow: string
  /** 촬영한 사진을 분석 서버에 올린다 */
  upload: (image: Blob) => Promise<AnalyzeDiaryResult>
  /** 업로드 성공 후 이동할 경로. requestId를 location state로 넘긴다 */
  nextPath: string
}

/** 전면 카메라로 얼굴을 찍어 분석을 요청하는 화면 (오늘의 기록/체험 공용) */
export default function FaceCaptureScreen({
  eyebrow,
  upload,
  nextPath,
}: FaceCaptureScreenProps) {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  // 카메라 첫 프레임이 들어오기 전 검은 화면이 번쩍이지 않게, 준비되면 서서히 보여준다.
  const [isCameraReady, setIsCameraReady] = useState(false)
  useScrollLock()

  useEffect(() => {
    let cancelled = false

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        })
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch {
        setCameraError('카메라를 사용할 수 없어요. 권한을 확인해주세요.')
      }
    }

    startCamera()

    return () => {
      cancelled = true
      streamRef.current?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  const handleCapture = async () => {
    if (isUploading || cameraError || !videoRef.current) return

    setIsUploading(true)
    setUploadError(null)

    try {
      const frame = await captureVideoFrame(videoRef.current)
      const { requestId } = await upload(frame)
      navigate(nextPath, { state: { requestId } })
    } catch (error) {
      const code = error instanceof ApiError ? error.code : null
      const fallback =
        error instanceof Error
          ? error.message
          : '사진 업로드에 실패했어요. 다시 시도해주세요.'
      setUploadError((code && ANALYZE_ERROR_MESSAGE[code]) ?? fallback)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <FaceCaptureLayout
      eyebrow={eyebrow}
      hint={
        <p
          className={`max-w-70 text-center text-xs ${uploadError ? 'text-red-500' : 'text-text-secondary'}`}
        >
          {uploadError ??
            cameraError ??
            '표시선에 얼굴이 인식되면 자동으로 촬영돼요'}
        </p>
      }
      action={
        <BottomButton
          onClick={handleCapture}
          disabled={isUploading || Boolean(cameraError) || !isCameraReady}
        >
          {isUploading ? '분석 요청 중...' : '촬영하기'}
        </BottomButton>
      }
    >
      {cameraError ? (
        <img
          src={personSilhouette}
          alt="얼굴 위치 가이드"
          className="absolute inset-0 h-full w-full object-contain p-9.5"
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          onLoadedData={() => setIsCameraReady(true)}
          className={`absolute inset-0 h-full w-full -scale-x-100 object-cover transition-opacity duration-300 ${
            isCameraReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </FaceCaptureLayout>
  )
}
