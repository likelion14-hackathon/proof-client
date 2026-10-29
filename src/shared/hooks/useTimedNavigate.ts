import { useEffect, useEffectEvent } from 'react'
import { useNavigate, type NavigateOptions } from 'react-router-dom'

/**
 * 화면을 delayMs 동안 보여준 뒤 다음 화면으로 자동 이동한다.
 * 연출용 중간 화면(공개/완료 화면 등)에서 쓴다. 화면을 벗어나면 타이머는 취소된다.
 */
export function useTimedNavigate(
  to: string,
  delayMs: number,
  options?: NavigateOptions,
) {
  const navigate = useNavigate()
  // options는 매 렌더 새 객체라 effect 의존성에 넣으면 타이머가 계속 재시작된다.
  // effect event로 감싸 최신 값을 읽되 타이머는 to/delayMs가 바뀔 때만 다시 건다.
  const goNext = useEffectEvent(() => navigate(to, options))

  useEffect(() => {
    const timer = setTimeout(goNext, delayMs)
    return () => clearTimeout(timer)
  }, [to, delayMs])
}
