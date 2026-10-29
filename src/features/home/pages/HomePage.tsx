import CycleProgressCard from '@/features/home/components/CycleProgressCard'
import ImportPromptCard from '@/features/home/components/ImportPromptCard'
import ReportLinkCard from '@/features/home/components/ReportLinkCard'
import TodayActionCard from '@/features/home/components/TodayActionCard'
import { HOME_SUMMARY } from '@/features/home/constants'
import { useCurrentPlanSummary } from '@/features/home/hooks/useCurrentPlanSummary'
import { useUserName } from '@/features/auth/useUserName'
import { getErrorMessage } from '@/shared/api/apiError'
import InlineMessage from '@/shared/components/InlineMessage'
import SkeletonCard from '@/shared/components/SkeletonCard'
import TabPageLayout from '@/shared/layouts/TabPageLayout'

export default function HomePage() {
  const userName = useUserName()
  const {
    data: planSummary,
    isPending: isPlanSummaryPending,
    error: planSummaryError,
  } = useCurrentPlanSummary()

  return (
    <TabPageLayout tab="home">
      <div className="px-5">
        <p className="text-text-secondary text-[15px] leading-4.5 font-semibold">
          안녕하세요, {userName}님!
        </p>
        <h1 className="text-text-primary mt-2.5 text-[26px] leading-10 font-semibold break-keep">
          {HOME_SUMMARY.headline}
        </h1>

        <div className="mt-7.5 flex flex-col gap-4.25">
          <TodayActionCard />
          <ReportLinkCard />

          {isPlanSummaryPending && !planSummaryError && (
            // CycleProgressCard(진행 카드 + 예약 줄)와 같은 높이
            <SkeletonCard className="h-45.75" />
          )}

          {planSummary && <CycleProgressCard summary={planSummary} />}

          {planSummary === null && (
            <InlineMessage className="px-1">
              진행 중인 플랜이 없어요. 플랜을 시작해보세요!
            </InlineMessage>
          )}

          {planSummaryError && (
            <InlineMessage tone="error" className="px-1">
              {getErrorMessage(
                planSummaryError,
                '플랜 진행 정보를 불러오지 못했어요.',
              )}
            </InlineMessage>
          )}

          <ImportPromptCard />
        </div>
      </div>
    </TabPageLayout>
  )
}
