import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CurrentPlanCard from '@/features/my/components/CurrentPlanCard'
import MenuRow from '@/features/my/components/MenuRow'
import MyScoreCards from '@/features/my/components/MyScoreCards'
import MyStatCards from '@/features/my/components/MyStatCards'
import NotificationRow from '@/features/my/components/NotificationRow'
import {
  MY_ACCOUNT_MENU_ITEMS,
  MY_NOTIFICATION_SETTINGS,
  MY_PLAN_MENU_ITEMS,
} from '@/features/my/constants'
import { useAuthStore } from '@/features/auth/store'
import { useUserEmail, useUserName } from '@/features/auth/useUserName'
import { signOut } from '@/features/auth/api'
import { useCurrentPlanStats } from '@/features/plan/hooks/useCurrentPlanStats'
import { useCurrentPlanSummary } from '@/features/home/hooks/useCurrentPlanSummary'
import { useMeasurementStore } from '@/features/measurement/store'
import { getErrorMessage } from '@/shared/api/apiError'
import InlineMessage from '@/shared/components/InlineMessage'
import SkeletonCard from '@/shared/components/SkeletonCard'
import TabPageLayout from '@/shared/layouts/TabPageLayout'

export default function MyPage() {
  const navigate = useNavigate()
  const email = useUserEmail()
  const name = useUserName()
  const logout = useAuthStore((state) => state.logout)
  // 진행률 바는 홈 화면과 동일한 API(GET /api/plans/current)를 그대로 재사용한다.
  const {
    data: planSummary,
    isPending: isPlanSummaryPending,
    error: planSummaryError,
  } = useCurrentPlanSummary()
  const {
    data: planStats,
    isPending: isPlanStatsPending,
    error: planStatsError,
  } = useCurrentPlanStats()
  const offlineResult = useMeasurementStore((state) => state.offlineResult)
  const [notificationState, setNotificationState] = useState(() =>
    Object.fromEntries(MY_NOTIFICATION_SETTINGS.map((item) => [item.id, true])),
  )

  const handleLogout = async () => {
    try {
      await signOut()
    } catch {
      // 서버 요청이 실패해도(토큰 만료 등) 로컬 로그아웃은 항상 진행한다.
    } finally {
      logout()
      navigate('/onboard')
    }
  }

  return (
    <TabPageLayout tab="info">
      <div>
        <div className="px-5">
          <h1 className="text-text-primary text-[26px] leading-10 font-semibold">
            {name}
          </h1>
          {email && (
            <p className="text-text-secondary mt-1 text-[14px] leading-4.5 font-semibold">
              {email}
            </p>
          )}

          {isPlanSummaryPending && !planSummaryError && (
            // CurrentPlanCard와 같은 높이
            <SkeletonCard className="mt-7.5 h-34.75" />
          )}

          {planSummary && (
            <div className="mt-7.5">
              <CurrentPlanCard progress={planSummary} />
            </div>
          )}

          {planSummary === null && (
            <InlineMessage className="mt-7.5">
              진행 중인 플랜이 없어요.
            </InlineMessage>
          )}

          {planSummaryError && (
            <InlineMessage tone="error" className="mt-7.5">
              {getErrorMessage(
                planSummaryError,
                '플랜 진행 정보를 불러오지 못했어요.',
              )}
            </InlineMessage>
          )}

          <div className="mt-2.5">
            <MyScoreCards
              scores={
                offlineResult
                  ? {
                      pigmentation: offlineResult.pigmentation,
                      pores: offlineResult.pores,
                      erythema: offlineResult.erythema,
                    }
                  : undefined
              }
            />
          </div>

          {isPlanStatsPending && !planStatsError && (
            <div className="mt-2.5 flex gap-4">
              <SkeletonCard compact className="h-24.5 flex-1" />
              <SkeletonCard compact className="h-24.5 flex-1" />
            </div>
          )}

          {planStats && (
            <div className="mt-2.5">
              <MyStatCards stats={planStats} />
            </div>
          )}

          {planStatsError && (
            <InlineMessage tone="error" className="mt-2.5">
              {getErrorMessage(
                planStatsError,
                '플랜 기록 통계를 불러오지 못했어요.',
              )}
            </InlineMessage>
          )}
        </div>

        <h2 className="text-text-primary mt-7.5 px-5 text-[20px] leading-6 font-semibold">
          플랜
        </h2>
        <div className="mt-2.5">
          {MY_PLAN_MENU_ITEMS.map((item) => (
            <MenuRow
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        <h2 className="text-text-primary mt-7.5 px-5 text-[20px] leading-6 font-semibold">
          알림
        </h2>
        <div className="mt-2.5">
          {MY_NOTIFICATION_SETTINGS.map((item) => (
            <NotificationRow
              key={item.id}
              title={item.title}
              description={item.description}
              checked={notificationState[item.id]}
              onChange={(checked) =>
                setNotificationState((prev) => ({
                  ...prev,
                  [item.id]: checked,
                }))
              }
            />
          ))}
        </div>

        <h2 className="text-text-primary mt-7.5 px-5 text-[20px] leading-6 font-semibold">
          계정
        </h2>
        <div className="mt-2.5">
          {MY_ACCOUNT_MENU_ITEMS.map((item) => (
            <MenuRow
              key={item.title}
              title={item.title}
              highlighted={'highlighted' in item && item.highlighted}
              onClick={item.title === '로그아웃' ? handleLogout : undefined}
            />
          ))}
        </div>
      </div>
    </TabPageLayout>
  )
}
