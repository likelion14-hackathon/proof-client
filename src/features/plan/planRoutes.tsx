import type { RouteObject } from 'react-router-dom'
import { lazyPage } from '@/shared/utils/lazyPage'

export const PlanRoutes: RouteObject[] = [
  {
    index: true,
    ...lazyPage(() => import('@/features/plan/pages/PlanPage')),
    handle: { title: '플랜' },
  },
]
