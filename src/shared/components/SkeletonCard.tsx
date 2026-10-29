import SkeletonBar from '@/shared/components/SkeletonBar'

interface SkeletonCardProps {
  /** 실제 카드와 같은 높이를 줘서 데이터가 들어올 때 레이아웃이 밀리지 않게 한다 */
  className?: string
  /** 진행 바 줄 없이 라벨/값 두 줄만 보여준다(작은 통계 카드용) */
  compact?: boolean
}

/** 데이터를 불러오는 동안 카드 자리를 채우는 스켈레톤 */
export default function SkeletonCard({
  className,
  compact,
}: SkeletonCardProps) {
  return (
    <div
      aria-hidden="true"
      className={`border-nav-border bg-box-background flex w-full flex-col gap-2.5 overflow-hidden rounded-[10px] border px-5 pt-5.5 ${className ?? ''}`}
    >
      <SkeletonBar className={`h-4 ${compact ? 'w-1/3' : 'w-2/5'}`} />
      <SkeletonBar className={`h-5.5 ${compact ? 'w-1/2' : 'w-1/4'}`} />
      {!compact && <SkeletonBar className="mt-4 h-5.5 w-full" />}
    </div>
  )
}
