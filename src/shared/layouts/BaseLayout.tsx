import { Outlet } from 'react-router-dom'
import NavigationProgress from '@/shared/components/NavigationProgress'
import ScrollToTop from '@/shared/components/ScrollToTop'

export default function BaseLayout() {
  return (
    <div className="bg-off-white text-text-primary min-h-screen-safe">
      <ScrollToTop />
      <NavigationProgress />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
