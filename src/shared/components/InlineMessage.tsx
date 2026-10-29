import type { ReactNode } from 'react'

interface InlineMessageProps {
  /** info: 빈 상태 안내, error: 불러오기 실패 등 */
  tone?: 'info' | 'error'
  className?: string
  children: ReactNode
}

/** 카드 자리에 들어가는 한 줄 안내/에러 문구 */
export default function InlineMessage({
  tone = 'info',
  className,
  children,
}: InlineMessageProps) {
  const toneClass =
    tone === 'error'
      ? 'text-highlight text-[13px] font-semibold'
      : 'text-text-secondary text-[14px] font-medium'

  return (
    <p
      role={tone === 'error' ? 'alert' : undefined}
      className={`break-keep ${toneClass} ${className ?? ''}`}
    >
      {children}
    </p>
  )
}
