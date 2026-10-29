import { useEffect, useId, type ReactNode } from 'react'
import warningIcon from '@/shared/assets/icons/warning.svg'
import { useScrollLock } from '@/shared/hooks/useScrollLock'

interface SheetAction {
  label: string
  onClick: () => void
}

interface AlertSheetProps {
  title: ReactNode
  description: ReactNode
  /** 오른쪽(초록) 버튼. secondaryAction이 없으면 꽉 찬 단일 버튼으로 보인다 */
  primaryAction: SheetAction
  /** 왼쪽(검정) 버튼 */
  secondaryAction?: SheetAction
  /** 배경을 누르거나 Esc를 눌렀을 때. 없으면 배경을 눌러도 닫히지 않는다 */
  onDismiss?: () => void
}

/** 화면 아래에서 올라오는 경고/확인 시트 */
export default function AlertSheet({
  title,
  description,
  primaryAction,
  secondaryAction,
  onDismiss,
}: AlertSheetProps) {
  const titleId = useId()
  useScrollLock()

  useEffect(() => {
    if (!onDismiss) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onDismiss])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="bg-modal-backdrop animate-fade-in absolute inset-0 backdrop-blur-[2px]"
        onClick={onDismiss}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="border-line bg-off-white animate-sheet-up relative w-full max-w-103.5 rounded-t-[50px] border pt-9.75 pb-[max(35px,env(safe-area-inset-bottom))]"
      >
        <div className="px-10">
          <img src={warningIcon} alt="" className="size-13.25" />
          <p
            id={titleId}
            className="text-text-primary mt-6 text-[20px] font-semibold"
          >
            {title}
          </p>
          <p className="text-text-secondary mt-3.75 text-[14px] leading-6.25 font-semibold break-keep">
            {description}
          </p>
        </div>

        {secondaryAction ? (
          <div className="mt-13.25 flex gap-3.5 px-5">
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="bg-dark text-off-white h-12.25 flex-1 rounded-[10px] text-[14px] font-semibold active:opacity-90"
            >
              {secondaryAction.label}
            </button>
            <button
              type="button"
              onClick={primaryAction.onClick}
              className="bg-primary text-off-white h-12.25 flex-1 rounded-[10px] text-[14px] font-semibold active:opacity-90"
            >
              {primaryAction.label}
            </button>
          </div>
        ) : (
          <div className="mt-9.5 px-5">
            <button
              type="button"
              onClick={primaryAction.onClick}
              className="bg-primary text-off-white flex h-14.5 w-full items-center justify-center rounded-[10px] text-[15px] font-semibold shadow-[0px_0px_4.2px_0px_rgba(115,115,115,0.25)] active:opacity-90"
            >
              {primaryAction.label}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
