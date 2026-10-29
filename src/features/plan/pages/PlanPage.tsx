import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import PlanCostCards from '@/features/measurement/components/PlanCostCards'
import PlanDetailSection from '@/features/measurement/components/PlanDetailSection'
import PlanScoreCards from '@/features/measurement/components/PlanScoreCards'
import PlanTimelineSection from '@/features/measurement/components/PlanTimelineSection'
import { useCurrentPlanDetail } from '@/features/plan/hooks/useCurrentPlanDetail'
import {
  buildDetailItems,
  buildTimelineRows,
  formatManwon,
} from '@/features/plan/utils'
import { rankByLowest } from '@/features/measurement/priorityLabels'
import { getErrorMessage } from '@/shared/api/apiError'
import InlineMessage from '@/shared/components/InlineMessage'
import SkeletonBar from '@/shared/components/SkeletonBar'
import SkeletonCard from '@/shared/components/SkeletonCard'
import Toast from '@/shared/components/Toast'
import TabPageLayout from '@/shared/layouts/TabPageLayout'

interface PlanLocationState {
  /** 플랜을 새로 시작한 직후 한 번만 보여주는 안내 문구 */
  toast?: string
}

export default function PlanPage() {
  const location = useLocation()
  const { data: plan, isLoading, error } = useCurrentPlanDetail()
  const [toastMessage] = useState(
    () => (location.state as PlanLocationState | null)?.toast ?? null,
  )

  const scores = plan?.metrics
    ? {
        pigmentation: plan.metrics.pigmentation,
        pores: plan.metrics.pores,
        erythema: plan.metrics.erythema,
      }
    : undefined

  // 서버 응답에 월 예상 금액이 없어서, 총 금액을 12주=3개월 기준으로 환산해서 보여줌.
  const costSummary = plan
    ? {
        total: {
          label: '총 금액 (12주)',
          amount: formatManwon(plan.totalPrice),
        },
        monthly: {
          label: '1달 예상 금액',
          amount: formatManwon(Math.round(plan.totalPrice / 3)),
        },
      }
    : undefined

  const timelineRows = plan ? buildTimelineRows(plan.items, 12) : undefined
  const detailItems = plan ? buildDetailItems(plan.items) : undefined

  const ranked = scores ? rankByLowest(scores) : null
  const timelineInsight = ranked
    ? `${ranked[0].label} 지표가 가장 낮아 1순위로 구성했어요. 12주 뒤 무엇이 효과였는지 구분할 수 있도록 시작 시점을 서로 다르게 배치했어요.`
    : ''

  return (
    <TabPageLayout
      tab="plan"
      bottomAccessory={
        toastMessage && (
          <div className="flex justify-center">
            <Toast message={toastMessage} />
          </div>
        )
      }
    >
      <div>
        <div className="px-5">
          <p className="text-text-secondary text-[15px] leading-4.5 font-semibold">
            현재 진행 중인 플랜
          </p>
          {plan ? (
            <h1 className="text-text-primary mt-2.75 text-[26px] leading-10 font-semibold break-keep">
              {plan.planSummary}
            </h1>
          ) : (
            isLoading && (
              <div className="mt-4.5 flex flex-col gap-2.5">
                <SkeletonBar className="h-6.5 w-4/5" />
                <SkeletonBar className="h-6.5 w-3/5" />
              </div>
            )
          )}
        </div>

        {isLoading && (
          <div className="mt-7.5 flex flex-col gap-4.25 px-5">
            <SkeletonCard className="h-30" />
            <SkeletonCard className="h-30" />
          </div>
        )}

        {!isLoading && plan === null && !error && (
          <InlineMessage className="mt-7.5 px-5">
            진행 중인 플랜이 없어요. 플랜을 시작해보세요!
          </InlineMessage>
        )}

        {error && (
          <InlineMessage tone="error" className="mt-7.5 px-5">
            {getErrorMessage(error, '플랜 정보를 불러오지 못했어요.')}
          </InlineMessage>
        )}

        {plan && (
          <div className="mt-7.5 flex flex-col gap-8.75">
            {scores && (
              <div className="px-5">
                <PlanScoreCards scores={scores} />
              </div>
            )}
            <div className="px-5">
              <PlanCostCards summary={costSummary} />
            </div>
            <PlanTimelineSection
              insightPosition="above"
              rows={timelineRows}
              insight={timelineInsight}
            />
            <PlanDetailSection items={detailItems} />
          </div>
        )}
      </div>
    </TabPageLayout>
  )
}
