import type { RouteObject } from 'react-router-dom'
import { lazyPage } from '@/shared/utils/lazyPage'

export const WellnessRoutes: RouteObject[] = [
  {
    index: true,
    ...lazyPage(() => import('@/features/wellness/pages/WellnessIntroPage')),
    handle: { title: '웰니스 지출 진단' },
  },
  {
    path: 'procedure-cost',
    ...lazyPage(
      () => import('@/features/wellness/pages/WellnessProcedureCostPage'),
    ),
    handle: { title: '시술 비용 입력' },
  },
  {
    path: 'skincare-cost',
    ...lazyPage(
      () => import('@/features/wellness/pages/WellnessSkincareCostPage'),
    ),
    handle: { title: '스킨케어 비용 입력' },
  },
  {
    path: 'effect-perception',
    ...lazyPage(
      () => import('@/features/wellness/pages/WellnessEffectPerceptionPage'),
    ),
    handle: { title: '효과 체감도' },
  },
  {
    path: 'contribution-awareness',
    ...lazyPage(
      () =>
        import('@/features/wellness/pages/WellnessContributionAwarenessPage'),
    ),
    handle: { title: '기여도 인지 여부' },
  },
  {
    path: 'waste-reveal',
    ...lazyPage(
      () => import('@/features/wellness/pages/WellnessWasteRevealPage'),
    ),
    handle: { title: '낭비 비용 공개' },
  },
  {
    path: 'yearly-spend-reveal',
    ...lazyPage(
      () => import('@/features/wellness/pages/WellnessYearlySpendRevealPage'),
    ),
    handle: { title: '연간 지출 비용 공개' },
  },
  {
    path: 'monthly-avg-reveal',
    ...lazyPage(
      () => import('@/features/wellness/pages/WellnessMonthlyAvgRevealPage'),
    ),
    handle: { title: '한 달 평균 지출 비용 공개' },
  },
  {
    path: 'spend-summary',
    ...lazyPage(
      () => import('@/features/wellness/pages/WellnessSpendSummaryPage'),
    ),
    handle: { title: '지출 요약' },
  },
  {
    path: 'saving-intro',
    ...lazyPage(
      () => import('@/features/wellness/pages/WellnessSavingIntroPage'),
    ),
    handle: { title: '절약 안내' },
  },
  {
    path: 'plan-teaser',
    ...lazyPage(
      () => import('@/features/wellness/pages/WellnessPlanTeaserPage'),
    ),
    handle: { title: '플랜 티저' },
  },
  {
    path: 'plan-teaser-spend',
    ...lazyPage(
      () => import('@/features/wellness/pages/WellnessPlanTeaserSpendPage'),
    ),
    handle: { title: '플랜 티저 + 연간 지출 비용' },
  },
  {
    path: 'plan-teaser-expand',
    ...lazyPage(
      () => import('@/features/wellness/pages/WellnessPlanTeaserExpandPage'),
    ),
    handle: { title: '플랜 티저 확장' },
  },
  {
    path: 'plan-cta',
    ...lazyPage(() => import('@/features/wellness/pages/WellnessPlanCtaPage')),
    handle: { title: '플랜 시작 CTA' },
  },
]
