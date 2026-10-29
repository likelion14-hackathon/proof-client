import type { RouteObject } from 'react-router-dom'
import { lazyPage } from '@/shared/utils/lazyPage'

/** /my 라우트 */
export const MyRoutes: RouteObject[] = [
  {
    index: true,
    ...lazyPage(() => import('@/features/my/pages/MyPage')),
    handle: { title: '정보' },
  },
]
