import type { RouteObject } from 'react-router-dom'
import { lazyPage } from '@/shared/utils/lazyPage'

export const OnboardRoutes: RouteObject[] = [
  {
    index: true,
    ...lazyPage(() => import('@/features/onboard/pages/onboardPage')),
    handle: { title: '온보딩' },
  },
  {
    path: 'kakao/callback',
    ...lazyPage(() => import('@/features/onboard/pages/onboardKakaoCallback')),
    handle: { title: '카카오 로그인 처리 중' },
  },
]
