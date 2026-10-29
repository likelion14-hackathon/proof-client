import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import { HomeRoutes } from '@/features/home/homeRoutes'
import { DiaryRoutes } from '@/features/diary/pages/diaryRoutes'
import { MeasurementRoutes } from '@/features/measurement/measurementRoutes'
import { MyRoutes } from '@/features/my/myRoutes'
import { PlanRoutes } from '@/features/plan/planRoutes'
import { OnboardRoutes } from '@/features/onboard/pages/onboardRoutes'
import { TrialRoutes } from '@/features/trial/pages/trialRoutes'
import { WellnessRoutes } from '@/features/wellness/wellnessRoutes'
import BaseLayout from '@/shared/layouts/BaseLayout'
import { lazyPage } from '@/shared/utils/lazyPage'

const isLocalhost =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'

function DevOnly() {
  if (!isLocalhost) return <Navigate to="/" replace />
  return <Outlet />
}

/** 첫 진입 시 페이지 청크를 받는 동안 보여줄 화면. html 배경색(off-white)만 보이게 둔다 */
function InitialLoadFallback() {
  return null
}

const router = createBrowserRouter([
  {
    // BaseLayout을 모든 섹션이 공유해서 탭/섹션을 오갈 때 레이아웃이 다시 마운트되지 않게 한다.
    element: <BaseLayout />,
    HydrateFallback: InitialLoadFallback,
    children: [
      { path: '/', children: HomeRoutes },
      { path: '/plan', children: PlanRoutes },
      { path: '/my', children: MyRoutes },
      {
        path: '/measurement',
        children: [
          { index: true, element: <Navigate to="center-select" replace /> },
          ...MeasurementRoutes,
        ],
      },
      { path: '/onboard', children: OnboardRoutes },
      { path: '/trial', children: TrialRoutes },
      { path: '/diary', children: DiaryRoutes },
      { path: '/wellness', children: WellnessRoutes },
    ],
  },
  {
    path: '/__dev',
    element: <DevOnly />,
    HydrateFallback: InitialLoadFallback,
    children: [
      {
        index: true,
        ...lazyPage(() => import('@/shared/pages/DevLinksPage')),
        handle: { title: '개발용 링크' },
      },
    ],
  },
  {
    path: '*',
    ...lazyPage(() => import('@/shared/pages/NotFoundPage')),
    HydrateFallback: InitialLoadFallback,
    handle: { title: 'Not Found' },
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
