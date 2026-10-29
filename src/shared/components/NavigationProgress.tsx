import { useNavigation } from 'react-router-dom'

/**
 * 다음 화면 청크를 받는 동안(이전 화면이 유지되는 구간) 화면 맨 위에 얇은 진행 바를 띄워
 * 탭이 눌렸다는 걸 알려준다. 빠른 전환에서는 보이지 않도록 CSS에서 살짝 늦게 나타난다.
 */
export default function NavigationProgress() {
  const isLoading = useNavigation().state === 'loading'
  if (!isLoading) return null

  return (
    <div
      role="progressbar"
      aria-label="화면을 불러오는 중"
      className="pointer-events-none fixed inset-x-0 top-[var(--safe-top)] z-[60] h-0.5 overflow-hidden"
    >
      <div className="bg-primary animate-nav-progress h-full w-1/3" />
    </div>
  )
}
