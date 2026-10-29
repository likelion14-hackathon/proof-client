import type { RouteObject } from 'react-router-dom'
import { lazyPage } from '@/shared/utils/lazyPage'

export const TrialRoutes: RouteObject[] = [
  {
    index: true,
    ...lazyPage(() => import('@/features/trial/pages/trial_Intro')),
    handle: { title: '체험' },
  },
  {
    path: 'capture',
    ...lazyPage(() => import('@/features/trial/pages/trial_Capture')),
    handle: { title: '촬영' },
  },
  {
    path: 'capture/complete',
    ...lazyPage(() => import('@/features/trial/pages/trial_CaptureComplete')),
    handle: { title: '촬영 완료' },
  },
  {
    path: 'analyze',
    ...lazyPage(() => import('@/features/trial/pages/trial_AnalyzeInProgress')),
    handle: { title: '분석 중' },
  },
  {
    path: 'analyze/complete',
    ...lazyPage(() => import('@/features/trial/pages/trial_AnalyzeComplete')),
    handle: { title: '분석 완료' },
  },
  {
    path: 'request',
    ...lazyPage(() => import('@/features/trial/pages/trial_Request')),
    handle: { title: '플랜 요청' },
  },
  {
    path: 'plan-generating',
    ...lazyPage(() => import('@/features/trial/pages/trial_PlanGenerating')),
    handle: { title: '일주일 플랜 생성 중' },
  },
  {
    path: 'plan-result',
    ...lazyPage(() => import('@/features/trial/pages/trial_PlanResult')),
    handle: { title: '일주일 플랜 결과' },
  },
]
