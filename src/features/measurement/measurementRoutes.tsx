import { Navigate, type RouteObject } from 'react-router-dom'
import { lazyPage } from '@/shared/utils/lazyPage'

export const MeasurementRoutes: RouteObject[] = [
  {
    path: 'report-request',
    ...lazyPage(() => import('@/features/measurement/pages/ReportRequestPage')),
    handle: { title: '리포트 생성 요청' },
  },
  {
    path: 'center-select',
    ...lazyPage(() => import('@/features/measurement/pages/CenterSelectPage')),
    handle: { title: '센터 선택' },
  },
  {
    path: 'agreement',
    ...lazyPage(() => import('@/features/measurement/pages/DataAgreementPage')),
    handle: { title: '측정 데이터 이용 동의' },
  },
  {
    path: 'processing',
    ...lazyPage(
      () => import('@/features/measurement/pages/ImportProcessingPage'),
    ),
    handle: { title: '측정 데이터 불러오는 중' },
  },
  {
    path: 'result',
    ...lazyPage(
      () => import('@/features/measurement/pages/MeasurementResultPage'),
    ),
    handle: { title: '측정 결과' },
  },
  {
    path: 'plan-request',
    ...lazyPage(
      () => import('@/features/measurement/pages/PlanCreationRequestPage'),
    ),
    handle: { title: '12주 플랜 만들기' },
  },
  {
    path: 'plan-generating',
    ...lazyPage(
      () => import('@/features/measurement/pages/PlanGeneratingPage'),
    ),
    handle: { title: '12주 플랜 생성 중' },
  },
  {
    path: 'plan-result',
    ...lazyPage(() => import('@/features/measurement/pages/PlanResultPage')),
    handle: { title: '12주 플랜 결과' },
  },
  {
    path: 'report',
    ...lazyPage(() => import('@/features/measurement/pages/ReportViewPage')),
    handle: { title: '내 리포트' },
  },
  {
    path: 'six-week-report',
    element: <Navigate to="/measurement/report" replace />,
  },
  {
    path: 'final-report',
    element: <Navigate to="/measurement/report" replace />,
  },
  {
    path: 'report-import-failed',
    ...lazyPage(
      () => import('@/features/measurement/pages/ReportImportFailedPage'),
    ),
    handle: { title: '측정 데이터 불러오기 실패' },
  },
  {
    path: 'report-generating',
    ...lazyPage(
      () => import('@/features/measurement/pages/ReportGeneratingPage'),
    ),
    handle: { title: '리포트 생성 중' },
  },
  {
    path: 'new-plan-result',
    ...lazyPage(() => import('@/features/measurement/pages/NewPlanResultPage')),
    handle: { title: '새 플랜 결과' },
  },
]
