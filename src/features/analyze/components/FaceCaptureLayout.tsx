import type { ReactNode } from 'react'
import Logo from '@/shared/components/Logo'

interface FaceCaptureLayoutProps {
  /** 제목 위 작은 문구 (예: "오늘의 기록", "체험해보기") */
  eyebrow: string
  /** 원형 가이드 안쪽 내용 (카메라 미리보기 또는 완료 표시) */
  children: ReactNode
  /** 원형 가이드 아래 안내 문구 */
  hint?: ReactNode
  /** 화면 하단 버튼 */
  action?: ReactNode
}

/**
 * 얼굴 촬영 화면과 촬영 완료 화면의 공통 레이아웃.
 * 두 화면이 같은 레이아웃을 써야 촬영 → 완료로 넘어갈 때 원형 가이드가 제자리에 머문다.
 * hint/action이 없어도 같은 높이의 자리를 비워 둔다.
 */
export default function FaceCaptureLayout({
  eyebrow,
  children,
  hint,
  action,
}: FaceCaptureLayoutProps) {
  return (
    <div className="bg-off-white fixed inset-0 mx-auto flex w-full max-w-103.5 flex-col overflow-hidden">
      <Logo />

      <div className="shrink-0 pl-5">
        <span className="text-text-secondary text-base font-semibold whitespace-nowrap">
          {eyebrow}
        </span>
        <p className="text-text-primary mt-2.5 text-2xl leading-[1.67] font-semibold">
          표시선에 얼굴을 맞춰주세요
        </p>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center px-5">
        <div className="bg-primary relative flex aspect-square w-full max-w-93.5 items-center justify-center rounded-full">
          <div className="bg-off-white flex h-[93.6%] w-[93.6%] items-center justify-center rounded-full">
            <div className="bg-outline relative h-[95.4%] w-[95.4%] overflow-hidden rounded-full">
              {children}
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-4 shrink-0 justify-center px-8">{hint}</div>

      <div className="shrink-0 px-5 pt-6.5 pb-[max(40px,env(safe-area-inset-bottom))]">
        {action ?? <div aria-hidden="true" className="h-14.5" />}
      </div>
    </div>
  )
}
