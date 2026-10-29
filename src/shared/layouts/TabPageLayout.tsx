import type { ReactNode } from 'react'
import BottomBar from '@/shared/components/BottomBar'
import BottomNav, { type NavTabId } from '@/shared/components/BottomNav'
import Logo from '@/shared/components/Logo'

interface TabPageLayoutProps {
  /** 하단 탭 바에서 선택 상태로 보여줄 탭 */
  tab: NavTabId
  children: ReactNode
  /** 탭 바 바로 위에 띄울 요소(토스트 등) */
  bottomAccessory?: ReactNode
}

/** 하단 탭 바가 있는 메인 화면(홈/플랜/기록/정보) 공통 레이아웃 */
export default function TabPageLayout({
  tab,
  children,
  bottomAccessory,
}: TabPageLayoutProps) {
  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />
      {children}
      <BottomBar>
        <div className="flex flex-col gap-3.75">
          {bottomAccessory}
          <BottomNav current={tab} />
        </div>
      </BottomBar>
    </div>
  )
}
