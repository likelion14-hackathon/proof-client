import { Navigate, Outlet } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store'
import { lazyPage } from '@/shared/utils/lazyPage'

/** 로그인하지 않았거나 세션이 만료되면(토큰 갱신 실패 → logout) 온보딩으로 보낸다 */
function RequireAuth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/onboard" replace />
  return <Outlet />
}

export const HomeRoutes: RouteObject[] = [
  {
    element: <RequireAuth />,
    children: [
      {
        index: true,
        ...lazyPage(() => import('@/features/home/pages/HomePage')),
        handle: { title: '홈' },
      },
    ],
  },
]
